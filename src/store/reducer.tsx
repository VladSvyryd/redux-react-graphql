import {
  Counter,
  CounterActionTypes,
  DECREMENT,
  INCREMENT,
  STORE_RESULT,
  DELETE_RESULT
} from "./types";
const initialState: Counter = {
  counter: 1,
  result: []
};

const reducer = (
  state: Counter = initialState,
  action: CounterActionTypes
): Counter => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      };
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };

    case STORE_RESULT:
      const newRes = state.result.concat({
        id: new Date().toString(),
        value: state.counter
      });
      return {
        ...state,
        result: newRes
      };
    case DELETE_RESULT:
      return {
        ...state,
        result: state.result.filter(each => each.id !== action.payload)
      };
  }

  return state;
};

export default reducer;
