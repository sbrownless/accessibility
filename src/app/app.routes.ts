import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'broken', pathMatch: 'full' },
  {
    path: 'broken',
    loadComponent: () => import('./broken/broken').then((module) => module.Broken),
  },
  {
    path: 'fixed',
    loadComponent: () => import('./fixed/fixed').then((module) => module.Fixed),
  },
  {
    path: 'wide-grid',
    loadComponent: () => import('./wide-grid/wide-grid').then((module) => module.WideGrid),
  },
  {
    path: 'customer-grid',
    loadComponent: () => import('./customer-grid/customer-grid').then((module) => module.CustomerGrid),
  },
  {
    path: 'mitigations',
    loadComponent: () => import('./mitigations/mitigations').then((module) => module.Mitigations),
  },
];
