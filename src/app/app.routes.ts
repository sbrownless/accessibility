import { Routes } from '@angular/router';
import { Broken } from './broken/broken';
import { Fixed } from './fixed/fixed';
import { Mitigations } from './mitigations/mitigations';
import { WideGrid } from './wide-grid/wide-grid';

export const routes: Routes = [
  { path: '', redirectTo: 'broken', pathMatch: 'full' },
  { path: 'broken', component: Broken },
  { path: 'fixed', component: Fixed },
  { path: 'wide-grid', component: WideGrid },
  { path: 'mitigations', component: Mitigations }
];
