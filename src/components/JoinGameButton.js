import React, { useState } from 'react';
import axios from 'axios';
import { usePlayerContext } from './PlayerContext';

function JoinGameButton({ gameId, onJoin }) {
  const { selectedPlayerId } = usePlayerContext();
  const [showModal, setShowModal] = useState(false);
  const [buli] = useState(100);

  const handleJoin = async () => {
    try {
      const gamesResponse = await axios.get('http://localhost:3000/games');
      const games = gamesResponse.data;

      const hasOtherGame = games.some(
        game =>
          (game.creator_id === selectedPlayerId ||
            game.player2_id === selectedPlayerId ||
            game.player3_id === selectedPlayerId) &&
          game.id !== gameId
      );

      if (hasOtherGame) {
        setShowModal(true);
        return;
      }

      const selectedBuli = parseInt(buli, 10);

      const chipsResponse = await axios.get(`http://localhost:3000/chips/${selectedPlayerId}`);
      const chipsData = chipsResponse.data;
      const currentChips = chipsData.chips || 0;

      if (currentChips < selectedBuli) {
        alert('Nemate dovoljno chipova za pridruživanje ovoj igri.');
        return;
      }

      const response = await axios.post(`http://localhost:3000/chips/${selectedPlayerId}/remove_chips?chips=${selectedBuli}`);
      if (response.status === 200) {
        console.log('Čipovi su uspešno oduzeti.');
      } else {
        console.error('Greška prilikom oduzimanja čipova.');
        return;
      }

      const requestData = { game: { player2_id: selectedPlayerId } };
      const updateGameResponse = await axios.put(`http://127.0.0.1:3000/games/${gameId}`, requestData);

      if (updateGameResponse.status === 200) {
        console.log('Igrač se pridružio igri:', gameId);
        onJoin(gameId);
      } else {
        console.error('Greška prilikom pridruživanja igri.');
      }
    } catch (error) {
      console.error('Greška prilikom pridruživanja igri:', error);
    }
  };

  return (
    <div>
      <button onClick={handleJoin}>Uđi kao desni</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Već imate drugu igru ili ste već u drugoj igri.</p>
            <button onClick={() => setShowModal(false)}>Zatvori</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default JoinGameButton;
