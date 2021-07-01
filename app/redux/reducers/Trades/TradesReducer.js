import { UPDATE_TRADES } from "app/redux/actionCreators/tradesAC";

export default function (state = [], action) {
  switch (action.type) {
    case UPDATE_TRADES:
      let newState = action.newTradesData;

      let newStateCombined = [...state, ...newState];

      if (newStateCombined.length > 10) {
        newStateCombined.splice(0, 9);
      }

      newStateCombined.sort(function (a, b) {
        return b.timestamp - a.timestamp;
      });


      newStateCombined.map(function (trade) {
        var today = new Date(trade.timestamp);
        trade.formattedTimestamp = (today.getHours().toString()).padStart(2, "0") + ":" + (today.getMinutes().toString()).padStart(2, "0") + ":" + (today.getSeconds().toString()).padStart(2, "0");
      });

      return newStateCombined.splice(0, 9);

    default:
      //returns a copy of the state object to trigger state change.
      return state.slice()
  }
}