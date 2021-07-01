import { CLEAR_ASKS, UPDATE_ASKS } from "app/redux/actionCreators/asksAC";

export default function (state = [], action) {
  switch (action.type) {
    case UPDATE_ASKS:
      let newState = action.newAsksData;
      let priceExists = false;

      if (state.length > 0) {
        state.some((row, index) => {
          if (state[index].price && newState.price && (state[index].price === newState.price)) {
            priceExists = true;

            return false;
          }
        });
      }

      if (priceExists === true) {
        priceExists = false;
        return state.slice()
      }
      else {
        let newStateCombined = [...state, newState];

        if (newStateCombined.length > 10) {
          newStateCombined = newStateCombined.splice(0, 9);
        }

        newStateCombined.sort(function (a, b) {
          return a.price - b.price;
        });

        if (newStateCombined.length > 0) {
          newStateCombined.forEach(function (row, index) {
            if ((!row || row.count === 0) || (!row || row.amount > 0)) {
              newStateCombined.splice(index, 1);
            }
          });

          newStateCombined.forEach(function (row, index) {
            if (newStateCombined[index - 1] && newStateCombined[index - 1].total) {
              newStateCombined[index].total = (parseFloat(newStateCombined[index - 1].total) + Math.abs(parseFloat(row.amount))).toFixed(2);
            }
            else {
              newStateCombined[index].total = Math.abs(parseFloat(row.amount).toFixed(2));
            }
          });
        }

        return newStateCombined.splice(0, 9);
      }

    case CLEAR_ASKS:
      return action.newAsksData;

    default:
      return state.slice()
  }
}