import { Component } from '@angular/core';
import '../grid-registration';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellFocusedEvent,
  ColDef,
  RowClickedEvent,
  themeQuartz,
} from 'ag-grid-community';

interface DemoRow {
  id: number;
  name: string;
  email: string;
  address: string;
  notes: string;
}

@Component({
  selector: 'app-mitigations',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './mitigations.html',
  styleUrls: ['./mitigations.css'],
})
export class Mitigations {
  theme = themeQuartz;
  selectedRow: DemoRow | null = null;

  wrapColumnDefs: ColDef<DemoRow>[] = [
    { field: 'name', flex: 1 },
    { field: 'address', flex: 1 },
    { field: 'notes', flex: 2 },
  ];

  scrollColumnDefs: ColDef<DemoRow>[] = [
    { field: 'id', pinned: 'left', width: 90 },
    { field: 'name', pinned: 'left', width: 150 },
    { field: 'email', width: 240 },
    { field: 'address', width: 280 },
    { field: 'notes', width: 360 },
  ];

  focusColumnDefs: ColDef<DemoRow>[] = [
    { field: 'name', flex: 1, minWidth: 100 },
    { field: 'email', flex: 1, minWidth: 100 },
    { field: 'notes', flex: 1, minWidth: 100 },
  ];

  detailColumnDefs: ColDef<DemoRow>[] = [
    { field: 'name', flex: 1 },
    { field: 'email', flex: 1 },
    { field: 'notes', flex: 2 },
  ];

  rowData: DemoRow[] = [
    {
      id: 1,
      name: 'Alice Murphy',
      email: 'alice@example.com',
      address: '123 Long Road, Galway, Ireland',
      notes:
        'Alice prefers email contact and has a long project history that should remain available at high zoom.',
    },
    {
      id: 2,
      name: 'Bob O\'Brien',
      email: 'bob@example.com',
      address: '456 Longer Road, Galway, Ireland',
      notes:
        'Bob is available in the afternoon. This intentionally lengthy note demonstrates content that would be difficult to scan inside a narrow grid cell.',
    },
    {
      id: 3,
      name: 'Cara Kelly',
      email: 'cara@example.com',
      address: '789 Harbour View, Cork, Ireland',
      notes:
        'Cara has several follow-up items. The detail panel keeps this information readable without making every table row unusually tall.',
    },
  ];

  defaultColDef: ColDef<DemoRow> = {
    resizable: true,
    sortable: true,
  };

  wrapDefaultColDef: ColDef<DemoRow> = {
    ...this.defaultColDef,
    wrapText: true,
    autoHeight: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
  };

  onCellFocused(event: CellFocusedEvent<DemoRow>) {
    if (event.rowIndex != null && event.column != null) {
      event.api.ensureIndexVisible(event.rowIndex);
      event.api.ensureColumnVisible(event.column);
    }
  }

  onRowClicked(event: RowClickedEvent<DemoRow>) {
    this.selectedRow = event.data ?? null;
  }

  clearDetails() {
    this.selectedRow = null;
  }
}
