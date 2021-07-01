import { UPDATE_TRADES } from "app/redux/actionCreators/tradesAC";

export function updateTrades(newTradesData) {
  return {
    type: UPDATE_TRADES,
    newTradesData
  }
}