import { Action } from '@ngrx/store';
import { ActionTypes } from '../actions/counter.actions';
// import { initialState } from "./state";

const counter = 0

export function counterReducer(state = counter, action: Action) {
  switch (action.type) {
    case ActionTypes.Increment:
      return state + 1;

    case ActionTypes.Decrement:
      return state - 1;

    case ActionTypes.Reset:
      return 0;

    default:
    return state
  }
}