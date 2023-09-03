import React from 'react';
import axios from 'axios';
import { usePlayerContext } from './PlayerContext';
import { useSelector } from 'react-redux';

function ExitGameButton({ gameId, onExit, creatorId }) {
  const { selectedPlayerId } = usePlayerContext();
  const games = useSelector(state => state.games);

  const handleExit = async () => {
    try {
      const game = games.find(game => game.id === gameId);
      if (game) {
        if (game.creator_id === selectedPlayerId && (game.status === 'pending' || game.status === 'destroyed')) {
          const response = await axios.post(`http://localhost:3000/chips/${selectedPlayerId}/refund_chips?chips=${game.buli}`);
          console.log('Response from refund request:', response.data);
        }
  
        if (game.status === 'pending') {
          if (game.player2_id) {
            const response = await axios.post(`http://localhost:3000/chips/${game.player2_id}/refund_chips?chips=${game.buli}`);
            console.log(`Refund request for player2 (${game.player2_id}):`, response.data);
          }
        }
  
        await axios.delete(`http://127.0.0.1:3000/games/${gameId}`);
        onExit();
      }
    } catch (error) {
      console.error('Greška prilikom izlaska iz igre:', error);
    }
  };
  

  return (
    selectedPlayerId === creatorId && <button onClick={handleExit}>Izađi iz igre</button>
  );
}

export default ExitGameButton;
