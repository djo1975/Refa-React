// auctionActions.js
export const startAuction = () => {
    return {
      type: 'START_AUCTION',
    };
  };
  
  export const addReadyPlayer = (playerId) => {
    return {
      type: 'ADD_READY_PLAYER',
      payload: playerId,
    };
  };

  export const changeCurrentPlayer = (nextPlayerIndex) => {
    return {
      type: 'CHANGE_CURRENT_PLAYER',
      payload: nextPlayerIndex,
    };
  };  
  
  export const endAuction = () => {
    return {
      type: 'END_AUCTION',
    };
  };
  