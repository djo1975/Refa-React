import React, { useState } from 'react';
import { usePlayerContext } from './PlayerContext';

function CreateGame() {
  const { selectedPlayerId } = usePlayerContext();
  const [showModal, setShowModal] = useState(false);

  const [buli, setBuli] = useState(100);
  const [refCount, setRefCount] = useState(2);


  const handleCreateGame = async () => {
    try {
      // Fetch players and games data from the server
      const gamesResponse = await fetch('http://localhost:3000/games');
      
      // Check if the player already has another game
      const gamesData = await gamesResponse.json();
      const hasOtherGame = gamesData.some(
        game =>
          game.creator_id === selectedPlayerId ||
          game.player2_id === selectedPlayerId ||
          game.player3_id === selectedPlayerId
      );
  
      if (hasOtherGame) {
        setShowModal(true);
        return;
      }
  
      const selectedBuli = parseInt(buli, 10);
  
      // Fetch current player's chips
      const chipsResponse = await fetch(`http://localhost:3000/chips/${selectedPlayerId}`);
      const chipsData = await chipsResponse.json();
      const currentChips = chipsData.chips || 0;
  
      if (currentChips < selectedBuli) {
        alert('Nemate dovoljno chipova za ovu igru.');
        return;
      }
  
      // Send a request to deduct chips
      const response = await fetch(
        `http://localhost:3000/chips/${selectedPlayerId}/remove_chips?chips=${selectedBuli}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (response.ok) {
        console.log('Chips deducted successfully.');
      } else {
        console.error('Greška prilikom oduzimanja chipova.');
      }
  
      // Create a new game object
      const newGame = {
        buli: selectedBuli,
        ref_count: refCount,
        player1_id: selectedPlayerId
      };
  
      // Send a request to create a new game
      const createGameResponse = await fetch('http://localhost:3000/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGame)
      });
  
      if (createGameResponse.ok) {
        console.log('Game created successfully.');
      } else {
        console.error('Greška prilikom kreiranja igre.');
      }
    } catch (error) {
      console.error('Greška prilikom kreiranja igre:', error);
    }
  };
  return (
    <div>
      <h2>Kreiraj Igru</h2>
      <label>
        Izaberite broj bula:
        <select value={buli} onChange={e => setBuli(e.target.value)}>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={150}>150</option>
          <option value={200}>200</option>
        </select>
      </label>
      <br />
      <label>
        Izaberite broj refea:
        <select value={refCount} onChange={e => setRefCount(e.target.value)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </label>
      <br />
      <button onClick={handleCreateGame}>Kreiraj igru</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Već imate drugu igru.</p>
            <button onClick={() => setShowModal(false)}>Zatvori</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateGame;
