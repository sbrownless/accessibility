import { Routes } from '@angular/router';
import { Broken } from './broken/broken';
import { Fixed } from './fixed/fixed';

export const routes: Routes = [
  { path: '', redirectTo: 'broken', pathMatch: 'full' },
  { path: 'broken', component: Broken },
  { path: 'fixed', component: Fixed }
];
