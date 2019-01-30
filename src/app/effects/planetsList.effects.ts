import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";

import {
  map,
  withLatestFrom,
  switchMap,
  catchError
} from "rxjs/operators";

import {
  PlanetsListActionTypes,
  FETCH_PLANETS_SUCCESS,
  FETCH_PLANETS_FAILURE,
  FETCH_NEXT_PLANETS_SUCCESS
} from "../actions/planetsList.actions";
import { PlanetsService } from "../services/planets.service";

@Injectable()
export class PlanetsListEffects {
  
  @Effect()
  loadPlanetsList$ = this.actions$.pipe(
    ofType(PlanetsListActionTypes.FETCH_PLANETS_REQUEST),
    switchMap(() =>
      this.planetsService.getPlanets().pipe(
        map(result => new FETCH_PLANETS_SUCCESS(result)),
        catchError(err => of(new FETCH_PLANETS_FAILURE(err)))
      )
    )
  );

  @Effect()
  nextPlanetsAdd$ = this.actions$.pipe(
    ofType(PlanetsListActionTypes.FETCH_NEXT_PLANETS_REQUEST),
    withLatestFrom((action: any) => action.payload),
    switchMap(nextURL =>
      this.planetsService.getPlanets(nextURL).pipe(
        map(result => new FETCH_NEXT_PLANETS_SUCCESS(result)),
        catchError(err => of(new FETCH_NEXT_PLANETS_SUCCESS(err)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private planetsService: PlanetsService
  ) {}
}
