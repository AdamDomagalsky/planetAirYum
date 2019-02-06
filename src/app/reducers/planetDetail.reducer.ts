import {
  PlanetDetailActionTypes,
  PlanetDetailActionsUnion
} from "../actions/planetDetail.actions";

const initState = {}

export function planetDetailReducer(state = initState, action: PlanetDetailActionsUnion) {
  switch (action.type) {

    case PlanetDetailActionTypes.SAVE_PLANET: {
      return {
        ...state,
        ...action.payload
      }
    }

    default:
    return state
  }
}