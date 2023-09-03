// src/redux/chipReducer.js
const initialState = 0;

const chipReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DEDUCT_CHIPS':
      return state - action.payload;
    case 'REFUND_CHIPS':
      return state + action.payload;
    case 'ADD_CHIPS':
      return state + action.payload;
    default:
      return state;
  }
};

export default chipReducer;
