import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ColDef, ModuleRegistry, themeQuartz } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {

  theme = themeQuartz;

  columnDefs: ColDef[] = [
    { field: 'id', width: 150 },
    { field: 'name', width: 300 },
    { field: 'email', width: 400 }
  ];

  rowData = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
  ];
}
