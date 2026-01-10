import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/salesman',
    pathMatch: 'full'
  },
  {
    path: 'salesman',
    loadComponent: () => import('./components/salesman-list/salesman-list')
      .then(m => m.SalesmanListComponent)
  },
  {
    path: 'salesman/new',
    loadComponent: () => import('./components/salesman-form/salesman-form')
      .then(m => m.SalesmanFormComponent)
  },
  {
    path: 'salesman/:sid',
    loadComponent: () => import('./components/salesman-detail/salesman-detail')
      .then(m => m.SalesmanDetailComponent)
  },
  {
    path: 'salesman/:sid/edit',
    loadComponent: () => import('./components/salesman-form/salesman-form')
      .then(m => m.SalesmanFormComponent)
  },
  {
    path: 'salesman/:sid/record/new',
    loadComponent: () => import('./components/record-form/record-form')
      .then(m => m.RecordFormComponent)
  },
  {
    path: 'salesman/:sid/record/:year',
    loadComponent: () => import('./components/record-form/record-form')
      .then(m => m.RecordFormComponent)
  }
];
