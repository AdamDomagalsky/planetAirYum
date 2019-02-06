import {
  PlanetsListActionTypes,
  PlanetsListActionsUnion
} from "../actions/planetsList.actions";



const initialState = {
  planetList: [],
  count: 0,
  next: null,
  previous: null
};


export function planetReducer(
  state = initialState,
  action: PlanetsListActionsUnion
) {
  switch (action.type) {
    case PlanetsListActionTypes.FETCH_PLANETS_FAILURE: {
      return {
        ...state,
        error: action.payload
      };
    }

    case PlanetsListActionTypes.FETCH_PLANETS_SUCCESS: {
      return {
        ...state,
        planetList: [...action.payload["results"]],
        ...action.payload
      };
    }

    case PlanetsListActionTypes.FETCH_NEXT_PLANETS_SUCCESS: {
      return {
        ...state,
        planetList: [...state.planetList, ...action.payload["results"]],
        ...action.payload
      };
    }



    default:
      return state;
  }
}
