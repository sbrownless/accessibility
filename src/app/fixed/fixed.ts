import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, CellFocusedEvent, themeQuartz } from 'ag-grid-community';

@Component({
  selector: 'app-fixed',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './fixed.html',
  styleUrls: ['./fixed.css'],
})
export class Fixed {
  theme = themeQuartz;

  // No minWidth large enough to force horizontal scroll at 320px (WCAG 1.4.10 reflow)
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 60,
    wrapText: true,
    autoHeight: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    resizable: true,
  };

  columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'name' },
    { field: 'email' },
    { field: 'address' },
    { field: 'notes', flex: 2 },
  ];

  rowData = [
    {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      address: '123 Long Road, Galway, Ireland',
      notes: 'This is a very long note that now wraps correctly.',
    },
    {
      id: 2,
      name: 'Bob',
      email: 'bob@example.com',
      address: '456 Longer Road, Galway, Ireland',
      notes: 'Another long note that no longer breaks accessibility.',
    },
  ];

  onCellFocused(event: CellFocusedEvent) {
    if (event.rowIndex != null && event.column != null) {
      // Vertical scroll
      event.api.ensureIndexVisible(event.rowIndex);
      // Horizontal scroll
      event.api.ensureColumnVisible(event.column);
    }
  }
}
