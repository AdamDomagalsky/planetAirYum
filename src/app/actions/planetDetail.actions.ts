import { Action } from "@ngrx/store";

export enum PlanetDetailActionTypes {
  SAVE_PLANET = "[PlanetDetailActions] SAVE_PLANET",
  GET_PLANET = "[PlanetDetailActions] GET_PLANET"
}

export type PlanetDetailActionsUnion = SAVE_PLANET | GET_PLANET;

export class SAVE_PLANET implements Action {
  readonly type = PlanetDetailActionTypes.SAVE_PLANET;
  constructor(readonly payload: {}) {}
}

export class GET_PLANET implements Action {
  readonly type = PlanetDetailActionTypes.GET_PLANET;
  constructor(readonly payload: {}) {}
}
