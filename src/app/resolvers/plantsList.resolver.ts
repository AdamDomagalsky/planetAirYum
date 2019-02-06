
import { Resolve } from '@angular/router';
import { Store, select } from '@ngrx/store';

import {FETCH_PLANETS_REQUEST} from '../actions/planetsList.actions'

import { Injectable } from '@angular/core';

@Injectable()
export class PlantsListResolver implements Resolve<any> {
    cachedList: any;
    constructor(private store: Store<any>) { }
    resolve() {
        this.store.dispatch(new FETCH_PLANETS_REQUEST); // to make effect fetch from api
    }
  }