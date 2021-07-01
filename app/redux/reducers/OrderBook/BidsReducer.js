import { CLEAR_BIDS, UPDATE_BIDS } from "app/redux/actionCreators/bidsAC";

export default function (state = [], action) {
  switch (action.type) {
    case UPDATE_BIDS:
      let newState = action.newBidsData;
      let priceExists = false;

      if (state.length > 0) {
        state.some(function (row, index) {
          if (state[index].price && newState.price && (state[index].price === newState.price)) {
            priceExists = true;

            return false;
          }
        })
      }

      if (priceExists === true) {
        priceExists = false;
        return state.slice()
      }
      else {
        let newStateCombined = [...state, newState];

        if (newStateCombined.length > 10) {
          newStateCombined = newStateCombined.slice(0, 9);
        }
        newStateCombined.sort(function (a, b) {
          return b.price - a.price;
        });

        if (newStateCombined.length > 0) {
          newStateCombined.forEach(function (row, index) {
            if (!row || row.count === 0) {
              newStateCombined.splice(index, 1);
            }
          });

          newStateCombined.forEach(function (row, index) {
            if (newStateCombined[index - 1] && newStateCombined[index - 1].total) {
              newStateCombined[index].total = (parseFloat(newStateCombined[index - 1].total) + parseFloat(row.amount)).toFixed(2);
            }
            else {
              newStateCombined[index].total = parseFloat(row.amount).toFixed(2);
            }
          });
        }
        return newStateCombined.splice(0, 9);
      }
    case CLEAR_BIDS:
      return action.newBidsData;
    default:
      return state.slice()
  }
}