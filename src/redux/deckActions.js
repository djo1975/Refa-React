import axios from 'axios';

// Redux akcija za slanje stanja kada se podele karte
export const sendDealtCards = (gameId, dealtCards) => {
    return async (dispatch) => {
      try {
        // Ovde postavite svoj URL za slanje podataka
        const url = `http://127.0.0.1:3000/games/${gameId}/dealt_card`;
        
        // Koristite Axios za slanje podataka na server
        const response = await axios.post(url, { game_id: gameId, dealt_card: dealtCards });
        
        // Opciono: Proverite odgovor sa servera i izvršite odgovarajuće akcije
        if (response.status === 200) {
          // Ako je slanje uspešno, možete izvršiti određene Redux akcije ili osvežiti stanje.
          // Na primer, ako želite da sačuvate dealtCards u Redux stanju, možete pozvati odgovarajuću akciju ovde.
          // dispatch(setDealtCards(dealtCards));
        }
      } catch (error) {
        // Obradite greške ovde ako slanje ne uspe
        console.error('Greška pri slanju podataka:', error);
      }
    };
  };  

  // Redux akcija za brisanje podeljenih karata
export const deleteDealtCards = (gameId) => {
  return async (dispatch) => {
    try {
      // Ovde postavite svoj URL za brisanje podataka
      const url = `http://127.0.0.1:3000/games/${gameId}/dealt_card`;
      
      // Koristite Axios za slanje zahteva za brisanje na server
      const response = await axios.delete(url);
      
      // Opciono: Proverite odgovor sa servera i izvršite odgovarajuće akcije
      if (response.status === 200) {
        // Ako je brisanje uspešno, možete izvršiti određene Redux akcije ili osvežiti stanje.
        // Na primer, ako želite da uklonite dealtCards iz Redux stanja, možete pozvati odgovarajuću akciju ovde.
        // dispatch(removeDealtCards(gameId));
      }
    } catch (error) {
      // Obradite greške ovde ako brisanje ne uspe
      console.error('Greška pri brisanju podataka:', error);
    }
  };
};  
export const setDealtCards = (dealtCards) => {
    return {
      type: 'SET_DEALT_CARDS',
      payload: dealtCards,
    };
  };

export const setPlayer1Cards = (gameId, cards) => {
    return {
      type: 'SET_PLAYER_1_CARDS',
      payload: { gameId, cards },
    };
  };
  
  export const setPlayer2Cards = (gameId, cards) => {
    return {
      type: 'SET_PLAYER_2_CARDS',
      payload: { gameId, cards },
    };
  };
  
  export const setPlayer3Cards = (gameId, cards) => {
    return {
      type: 'SET_PLAYER_3_CARDS',
      payload: { gameId, cards },
    };
  };
  
  export const setTableCards = (gameId, cards) => {
    return {
      type: 'SET_TABLE_CARDS',
      payload: { gameId, cards },
    };
  };
  