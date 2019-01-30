import { planetReducer } from "./planet.reducer";
import { counterReducer } from "./counter.reducer";

export const reducers = {
    counter: counterReducer,
    planetStorage: planetReducer,
  };