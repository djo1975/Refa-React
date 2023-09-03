import React, { createContext, useContext, useState, useEffect } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children, initialPlayerId }) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState(initialPlayerId);
  const [currentPlayerName, setCurrentPlayerName] = useState('');

  // Funkcija za dohvatanje imena korisnika sa servera
  const fetchPlayerName = async (playerId) => {
    try {
      const response = await fetch(`http://localhost:3000/players/${playerId}`);
      const playerData = await response.json();
      setCurrentPlayerName(playerData.name);
    } catch (error) {
      console.error('Greška prilikom dohvatanja imena korisnika:', error);
    }
  };

  useEffect(() => {
    if (selectedPlayerId) {
      fetchPlayerName(selectedPlayerId);
    }
  }, [selectedPlayerId]);

  return (
    <PlayerContext.Provider value={{ selectedPlayerId, setSelectedPlayerId, currentPlayerName }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  return useContext(PlayerContext);
};
