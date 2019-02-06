import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";

import { map, withLatestFrom, switchMap } from "rxjs/operators";
import { PlanetsService } from "../services/planets.service";

import {
  PlanetDetailActionTypes,
  SAVE_PLANET
} from "../actions/planetDetail.actions";

@Injectable()
export class PlanetDetailEffects {
  @Effect()
  getPlanetDetail$ = this.actions$.pipe(
    ofType(PlanetDetailActionTypes.GET_PLANET),
    withLatestFrom((action: any) => action.payload),
    switchMap(URL =>
      this.planetsService
        .getPlanetDetail(URL)
        .pipe(map(result => new SAVE_PLANET({[URL.toString()]: result})))
    )
  );

  constructor(
    private actions$: Actions,
    private planetsService: PlanetsService
  ) {}
}
