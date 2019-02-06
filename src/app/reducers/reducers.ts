import { planetReducer } from "./planet.reducer";
import { planetDetailReducer } from "./planetDetail.reducer";

export const reducers = {
    planetDetail: planetDetailReducer,
    planetStorage: planetReducer,
  };