import { CLEAR_ASKS, UPDATE_ASKS } from "app/redux/actionCreators/asksAC"

export function clearAsks() {
  return {
    type: CLEAR_ASKS,
    newAsksData: []
  }
}

export function updateAsks(newAsksData) {
  return {
    type: UPDATE_ASKS,
    newAsksData
  }
}