import axios from "axios";

export const updateGames = (games) => ({
  type: 'UPDATE_GAMES',
  payload: games,
});

export const addGame = (game) => ({
  type: 'ADD_GAME',
  payload: game,
});

export const createGame = (gameData) => async (dispatch) => {
  try {
    const response = await axios.post('http://127.0.0.1:3000/games', gameData);
    if (response.status === 201) {
      const newGame = response.data;
      dispatch(addGame(newGame));
    }
  } catch (error) {
    console.error('Greška prilikom kreiranja igre:', error);
  }
};

