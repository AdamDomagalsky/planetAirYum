import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlantsListViewComponent } from './plants-list-view/plants-list-view.component';

import { 
  MatToolbarModule, 
  MatPaginatorModule,
  MatListModule
 } from '@angular/material';
 import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

 import { PaginatorService } from './services/paginator.service';
 import { PlanetsService } from './services/planets.service';



@NgModule({
  declarations: [
    AppComponent,
    PlantsListViewComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatListModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PaginatorService, PlanetsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
