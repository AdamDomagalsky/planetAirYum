import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

// SZTOR
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment"; // Angular CLI environemnt
import { StoreModule } from "@ngrx/store";
import { reducers } from "./reducers/reducers";

//EFECTS
import { EffectsModule } from "@ngrx/effects";
import { PlanetsListEffects } from "./effects/planetsList.effects";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PlantsListViewComponent } from "./plants-list-view/plants-list-view.component";

import {
  MatToolbarModule,
  MatPaginatorModule,
  MatListModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatTableModule,
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { PaginatorService } from "./services/paginator.service";
import { PlanetsService } from "./services/planets.service";
import { PlantsListResolver } from "./resolvers/plantsList.resolver";
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';

@NgModule({
  declarations: [AppComponent, PlantsListViewComponent, PlanetDetailComponent],
  imports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatButtonToggleModule,
    EffectsModule.forRoot([PlanetsListEffects]), // it must be b4 StoreModule.forRoot(...)
    StoreModule.forRoot(reducers), // combined routers
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  providers: [PaginatorService, PlanetsService, PlantsListResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
