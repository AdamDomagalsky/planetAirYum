import { createSelector } from "@ngrx/store";

export const selectIPlanet = (state: any) => state.planetDetail;

export const getPlanetItemById = id =>
  createSelector(
    selectIPlanet,
    planet => {
      return planet[id];
    }
  );
