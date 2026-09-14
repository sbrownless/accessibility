import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, themeQuartz } from 'ag-grid-community';

@Component({
  selector: 'app-broken',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './broken.html',
  styleUrls: ['./broken.css']
})

export class Broken {

  theme = themeQuartz;

 columnDefs: ColDef[] = [
    { field: 'id', width: 150 },
    { field: 'name', width: 300 },
    { field: 'email', width: 400 },
    { field: 'address', width: 500 },
    { field: 'notes', width: 600 }
  ];

  rowData = [
    {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      address: '123 Long Road, Galway, Ireland',
      notes: 'This is a very long note that will break at 400% zoom.'
    },
    {
      id: 2,
      name: 'Bob',
      email: 'bob@example.com',
      address: '456 Longer Road, Galway, Ireland',
      notes: 'Another long note that demonstrates the accessibility issue.'
    }
  ];
}
