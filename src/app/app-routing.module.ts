import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlantsListViewComponent } from './plants-list-view/plants-list-view.component'

const routes: Routes = [
  {
    path: '',
    component: PlantsListViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
