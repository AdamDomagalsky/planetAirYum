import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlantsListViewComponent } from './plants-list-view/plants-list-view.component'
import { PlantsListResolver } from "./resolvers/plantsList.resolver";
import { PlanetDetailComponent } from './planet-detail/planet-detail.component'


const routes: Routes = [
  {
    path: '',
    component: PlantsListViewComponent,
    resolve: {PlantsListResolver} // to fetch on route enter
  },
  { path: 'planets/:id', component: PlanetDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
