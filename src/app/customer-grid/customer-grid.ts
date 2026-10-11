import { ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import '../grid-registration';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent, themeQuartz } from 'ag-grid-community';

const DEFAULT_WIDTH = 150;
// Browser zoom changes devicePixelRatio; this assumes 100% display scaling (ratio 1 at 100% zoom)
const ZOOM_200_QUERY = '(min-resolution: 2dppx)';

const NAMES = ['Acme Holdings', 'Birch & Sons Ltd', 'Cobalt Logistics', 'Delta Foods International', 'Evergreen Supplies'];

function buildColumns(pinFirst: boolean): ColDef[] {
  const cols: ColDef[] = [
    { field: 'name', headerName: 'Customer Name', pinned: pinFirst ? 'left' : null, width: 180 },
    { field: 'number', headerName: 'Customer Number' },
    { field: 'joinDate', headerName: 'Customer Join Date' },
    { field: 'discount', headerName: 'Customer Discount' },
  ];
  for (let i = 1; i <= 15; i++) {
    cols.push({ field: `doc${i}`, headerName: `Document ID ${i}` });
  }
  for (let i = 1; i <= 16; i++) {
    cols.push({ field: `custom${i}`, headerName: `Custom Field ${i}` });
  }
  return cols;
}

function buildRows(count: number) {
  return Array.from({ length: count }, (_, r) => {
    const n = r + 1;
    const row: Record<string, string> = {
      name: `${NAMES[r % NAMES.length]} ${n}`,
      number: `CUST-${String(100000 + n)}`,
      joinDate: new Date(2015, r % 12, (r % 28) + 1).toISOString().slice(0, 10),
      discount: `${(r % 20) + 1}%`,
    };
    for (let i = 1; i <= 15; i++) {
      row[`doc${i}`] = `DOC-${String(n).padStart(4, '0')}-${String(i).padStart(2, '0')}-REF${n * i}`;
    }
    for (let i = 1; i <= 16; i++) {
      row[`custom${i}`] = `Custom value ${i} for customer ${n}`;
    }
    return row;
  });
}

@Component({
  imports: [AgGridAngular],
  selector: 'app-customer-grid',
  styleUrl: './customer-grid.css',
  templateUrl: './customer-grid.html',
})
export class CustomerGrid implements OnDestroy {
  theme = themeQuartz.withParams({
    columnBorder: { style: 'solid', width: 1, color: '#767676' },
    rowBorder: { style: 'solid', width: 1, color: '#767676' },
    headerColumnBorder: { style: 'solid', width: 1, color: '#767676' },
    headerColumnBorderHeight: '100%',
    pinnedColumnBorder: { style: 'solid', width: 2, color: '#444444' },
    accentColor: '#0a2f8f',
    focusShadow: { spread: 3, color: '#0a2f8f' },
    rangeSelectionBorderColor: '#0a2f8f',
    rangeSelectionBackgroundColor: 'rgba(10, 47, 143, 0.15)',
    rowHoverColor: 'rgba(10, 47, 143, 0.08)',
    selectedRowBackgroundColor: 'rgba(10, 47, 143, 0.2)',
  });
  pinned = true;
  zoomed = false;
  private userPinned = true;
  columnDefs: ColDef[] = buildColumns(true);
  rowData = buildRows(150);
  pageSize = 25;
  pageSizeOptions = [25, 50, 100];

  defaultColDef: ColDef = {
    width: DEFAULT_WIDTH,
    minWidth: 100,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
  };

  private api?: GridApi;
  private mql = window.matchMedia(ZOOM_200_QUERY);
  private cdr = inject(ChangeDetectorRef);
  private onZoomChange = () => {
    if (this.mql.matches === this.zoomed) return;
    this.applySizing();
    // MediaQueryList events can fire outside Angular's change detection
    this.cdr.detectChanges();
  };

  constructor() {
    this.mql.addEventListener('change', this.onZoomChange);
    window.addEventListener('resize', this.onZoomChange);
  }

  ngOnDestroy() {
    this.mql.removeEventListener('change', this.onZoomChange);
    window.removeEventListener('resize', this.onZoomChange);
  }

  onGridReady(event: GridReadyEvent) {
    this.api = event.api;
    this.applySizing();
  }

  togglePin(checked: boolean) {
    this.pinned = checked;
    this.userPinned = checked;
    this.applySizing();
  }

  // >=200% zoom: fit columns to content; below: fixed width with ellipsis
  applySizing() {
    if (!this.api) return;
    this.zoomed = this.mql.matches;
    // Pinning is forced off at 200%+ and the user's choice restored below it
    this.pinned = this.zoomed ? false : this.userPinned;
    this.api.setGridOption('columnDefs', buildColumns(this.pinned));
    this.api.ensureColumnVisible('name', 'start');
    if (this.zoomed) {
      this.api.autoSizeAllColumns(true);
    } else {
      this.api.setColumnWidths(
        (this.api.getColumns() ?? []).map((c) => ({ key: c.getColId(), newWidth: c.getColId() === 'name' ? 180 : DEFAULT_WIDTH })),
      );
    }
  }
}
