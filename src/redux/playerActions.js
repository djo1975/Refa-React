// playerActions.js
export const fetchPlayersRequest = () => ({
  type: 'FETCH_PLAYERS_REQUEST',
});

export const fetchPlayersSuccess = (players) => ({
  type: 'FETCH_PLAYERS_SUCCESS',
  payload: players,
});

export const fetchPlayersFailure = (error) => ({
  type: 'FETCH_PLAYERS_FAILURE',
  error,
});

export const fetchPlayers = () => {
  return (dispatch) => {
    dispatch(fetchPlayersRequest());
    fetch('http://localhost:3000/players') // Zamijenite sa stvarnom URL adresom vašeg API-ja
      .then((response) => response.json())
      .then((data) => dispatch(fetchPlayersSuccess(data)))
      .catch((error) => dispatch(fetchPlayersFailure(error)));
  };
};
