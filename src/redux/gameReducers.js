// src/redux/gameReducer.js
const initialState = [];

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_GAMES':
      return action.payload;
      
      case 'ADD_GAME':
  return [...state, action.payload];

    default:
      return state;
  }
};

export default gameReducer;
