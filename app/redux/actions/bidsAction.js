import { CLEAR_BIDS, UPDATE_BIDS } from "app/redux/actionCreators/bidsAC"

export function clearBids() {
  return {
    type: CLEAR_BIDS,
    newBidsData: []
  }
}

export function updateBids(newBidsData) {
  return {
    type: UPDATE_BIDS,
    newBidsData
  }
}