import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, CellFocusedEvent, themeQuartz } from 'ag-grid-community';

const COLUMN_COUNT = 30;

@Component({
  imports: [AgGridAngular],
  selector: 'app-wide-grid',
  styleUrl: './wide-grid.css',
  templateUrl: './wide-grid.html',
})
export class WideGrid {
  theme = themeQuartz;

  defaultColDef: ColDef = {
    minWidth: 120,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
  };

  // id/name pinned so row context survives horizontal scroll at narrow widths
  columnDefs: ColDef[] = [
    { field: 'id', pinned: 'left', minWidth: 80 },
    { field: 'name', pinned: 'left' },
    ...Array.from({ length: COLUMN_COUNT }, (_, i) => ({
      field: `col${i + 1}`,
      headerName: `Column ${i + 1}`,
    })),
  ];

  rowData = Array.from({ length: 10 }, (_, row) => {
    const record: Record<string, string | number> = {
      id: row + 1,
      name: `Person ${row + 1}`,
    };
    for (let i = 1; i <= COLUMN_COUNT; i++) {
      record[`col${i}`] = `R${row + 1}C${i}`;
    }
    return record;
  });

  onCellFocused(event: CellFocusedEvent) {
    if (event.rowIndex != null && event.column != null) {
      // Vertical scroll
      event.api.ensureIndexVisible(event.rowIndex);
      // Horizontal scroll — this is how focus stays visible instead of wrapping (WCAG 2.4.7)
      event.api.ensureColumnVisible(event.column);
    }
  }
}
