// auctionReducer.js
const initialState = {
    currentPlayerIndex: 0,
    isAuctionActive: true,
    readyPlayers: [],
  };
  
  const auctionReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'START_AUCTION':
        return {
          ...state,
          isAuctionActive: true,
          readyPlayers: [],
        };
      case 'ADD_READY_PLAYER':
        return {
          ...state,
          readyPlayers: [...state.readyPlayers, action.payload],
        };
        case 'CHANGE_CURRENT_PLAYER':
  return {
    ...state,
    currentPlayerIndex: action.payload,
  };
      case 'END_AUCTION':
        return {
          ...state,
          isAuctionActive: false,
        };
      default:
        return state;
    }
  };
  
  export default auctionReducer;
  