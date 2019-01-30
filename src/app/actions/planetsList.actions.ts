import { Action } from "@ngrx/store";

export enum PlanetsListActionTypes {
  FETCH_PLANETS_REQUEST = "[PlanetsListActions] FETCH_PLANETS_REQUEST",
  FETCH_PLANETS_FAILURE = "[PlanetsListActions] FETCH_PLANETS_FAILURE",
  FETCH_PLANETS_SUCCESS = "[PlanetsListActions] FETCH_PLANETS_SUCCESS",
  FETCH_NEXT_PLANETS_REQUEST = "[PlanetsListActions] FETCH_NEXT_PLANETS_REQUEST",
  FETCH_NEXT_PLANETS_FAILURE = "[PlanetsListActions] FETCH_NEXT_PLANETS_FAILURE",
  FETCH_NEXT_PLANETS_SUCCESS = "[PlanetsListActions] FETCH_NEXT_PLANETS_SUCCESS"
}

export type PlanetsListActionsUnion =
  | FETCH_PLANETS_REQUEST
  | FETCH_PLANETS_FAILURE
  | FETCH_PLANETS_SUCCESS
  | FETCH_NEXT_PLANETS_REQUEST
  | FETCH_NEXT_PLANETS_FAILURE
  | FETCH_NEXT_PLANETS_SUCCESS;

export class FETCH_PLANETS_REQUEST implements Action {
  readonly type = PlanetsListActionTypes.FETCH_PLANETS_REQUEST;
}

export class FETCH_PLANETS_FAILURE implements Action {
  readonly type = PlanetsListActionTypes.FETCH_PLANETS_FAILURE;
  constructor(readonly payload: {}) {}
}

export class FETCH_PLANETS_SUCCESS implements Action {
  readonly type = PlanetsListActionTypes.FETCH_PLANETS_SUCCESS;
  constructor(readonly payload: {}) {}
}

export class FETCH_NEXT_PLANETS_REQUEST implements Action {
  readonly type = PlanetsListActionTypes.FETCH_NEXT_PLANETS_REQUEST;
  constructor(readonly payload: {}) {}
}

export class FETCH_NEXT_PLANETS_FAILURE implements Action {
  readonly type = PlanetsListActionTypes.FETCH_NEXT_PLANETS_FAILURE;
  constructor(readonly payload: {}) {}
}

export class FETCH_NEXT_PLANETS_SUCCESS implements Action {
  readonly type = PlanetsListActionTypes.FETCH_NEXT_PLANETS_SUCCESS;
  constructor(readonly payload: {}) {}
}
