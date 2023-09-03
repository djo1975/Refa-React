import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PlayerList() {
  const [players, setPlayers] = useState([]); // Lokalno stanje za igrače

  useEffect(() => {
    // Dohvati igrače sa servera
    axios.get('http://127.0.0.1:3000/players')
      .then(response => {
        setPlayers(response.data); // Postavi lokalno stanje sa igračima
      })
      .catch(error => {
        console.error('Greška prilikom dohvatanja igrača:', error);
      });
  }, []);

  return (
    <div>
      <h2>Lista igrača</h2>
      <ul>
        {players.map(player => (
          <li key={player.id}>
            {player.name} - Žetoni: {player.chips}, Rejting: {player.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;
