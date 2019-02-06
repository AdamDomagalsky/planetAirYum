import { Resolve } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { PlatformLocation } from "@angular/common";

import { GET_PLANET } from "../actions/planetDetail.actions";

import { Injectable } from "@angular/core";

import { getPlanetItemById } from "../selectors/getPlanetById.selector";

@Injectable()
export class PlantsDetailResolver implements Resolve<any> {
  constructor(
    private platformLocation: PlatformLocation,
    private store: Store<any>
  ) {}
  resolve() {
    const url = this.platformLocation.pathname;
    if (url === "/") {
      return;
    }
    this.store.select(getPlanetItemById(url)).subscribe(planet => {
      if (planet === undefined) {
        this.store.dispatch(new GET_PLANET(url)); // effect to get planet if refreshed
      } else {
      }
    });
  }
}
