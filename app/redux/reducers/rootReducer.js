import { combineReducers } from "redux";

import AsksReducer from "./OrderBook/AsksReducer";
import BidsReducer from "./OrderBook/BidsReducer";
import TradesReducer from "./Trades/TradesReducer";

const rootReducer = combineReducers({
  tradesData: TradesReducer,
  asksData: AsksReducer,
  bidsData: BidsReducer
});

export default rootReducer;