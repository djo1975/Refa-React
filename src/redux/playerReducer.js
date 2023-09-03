// playerReducer.js
const initialState = {
  players: []
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PLAYERS_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_PLAYERS_SUCCESS':
      return { ...state, isLoading: false, players: action.payload };
    case 'FETCH_PLAYERS_FAILURE':
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default playerReducer;
