import React, { useState } from 'react';
import GameList from './GameList';
import PlayerList from './PlayerList';
import CreateGame from './CreateGame';
import ChipManager from './ChipManager'; 

function Lobby() {
  const [activeWindow, setActiveWindow] = useState('games');

  const renderActiveWindow = () => {
    switch (activeWindow) {
      case 'games':
        return (
          <div className="tab-content">
            <GameList />
          </div>
        );
      case 'players':
        return <PlayerList />;
      case 'createGame':
        return <CreateGame />;
      case 'chipManager':
        return <ChipManager />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Dobrodošli u lobi</h1>
      <div className="nav-bar">
        <button onClick={() => setActiveWindow('games')}>Lista igara</button>
        <button onClick={() => setActiveWindow('players')}>Lista igrača</button>
        <button onClick={() => setActiveWindow('createGame')}>Kreiraj igru</button>
        <button onClick={() => setActiveWindow('chipManager')}>Chip Menadžer</button>
      </div>
      <div className="lobby-content">
        <div className="window-container">
          {renderActiveWindow()}
        </div>
      </div>
    </div>
  );
}

export default Lobby;
