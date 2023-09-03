import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { usePlayerContext } from './components/PlayerContext';
import Lobby from './components/Lobby';
import Table from './components/tables/Table';

function App() {
  const activeGames = useSelector(state => state.games.filter(game => game.status === 'active'));
  const { selectedPlayerId, currentPlayerName } = usePlayerContext();

  const filteredGames = activeGames.filter(
    (activeGame) =>
      activeGame.creator_id === selectedPlayerId ||
      activeGame.player2_id === selectedPlayerId ||
      activeGame.player3_id === selectedPlayerId
  );
  
  return (
    <div className="App">
      {filteredGames.length > 0 ? (
        filteredGames.map((activeGame) => (
          <Table
            key={activeGame.id} 
            game={activeGame}
            currentPlayerId={selectedPlayerId}
            currentPlayerName={currentPlayerName}
          />
        ))
      ) : (
        <Lobby />
      )}
    </div>
  );
}

export default App;
