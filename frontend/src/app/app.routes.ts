import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesmanListComponent } from './components/salesman-list/salesman-list';
import { SalesmanDetailComponent } from './components/salesman-detail/salesman-detail';
import { SalesmanFormComponent } from './components/salesman-form/salesman-form';
import { RecordFormComponent } from './components/record-form/record-form';

const routes: Routes = [
  { path: '', redirectTo: '/salesman', pathMatch: 'full' },
  { path: 'salesman', component: SalesmanListComponent },
  { path: 'salesman/new', component: SalesmanFormComponent },
  { path: 'salesman/:sid', component: SalesmanDetailComponent },
  { path: 'salesman/:sid/edit', component: SalesmanFormComponent },
  { path: 'salesman/:sid/record/new', component: RecordFormComponent },
  { path: 'salesman/:sid/record/:year', component: RecordFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
