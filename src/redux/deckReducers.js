const initialState = {
    games: {},
    player1Cards: [],
    player2Cards: [],
    player3Cards: [],
    tableCards: [],
    dealtCards: [],
  };
  
  const deckReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DEALT_CARDS':
      return {
        ...state,
        dealtCards: action.payload,
      };
      case 'SET_PLAYER_1_CARDS':
        return {
          ...state,
          games: {
            ...state.games,
            [action.payload.gameId]: {
              ...state.games[action.payload.gameId],
              player1Cards: action.payload.cards,
            },
          },
        };
      case 'SET_PLAYER_2_CARDS':
        return {
          ...state,
          games: {
            ...state.games,
            [action.payload.gameId]: {
              ...state.games[action.payload.gameId],
              player2Cards: action.payload.cards,
            },
          },
        };
      case 'SET_PLAYER_3_CARDS':
        return {
          ...state,
          games: {
            ...state.games,
            [action.payload.gameId]: {
              ...state.games[action.payload.gameId],
              player3Cards: action.payload.cards,
            },
          },
        };
      case 'SET_TABLE_CARDS':
        return {
          ...state,
          games: {
            ...state.games,
            [action.payload.gameId]: {
              ...state.games[action.payload.gameId],
              tableCards: action.payload.cards,
            },
          },
        };
      default:
        return state;
    }
  };
  
  export default deckReducer;