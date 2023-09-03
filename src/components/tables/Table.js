import React, { useEffect } from 'react';
import GreenSurface from './GreenSurface';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlayers } from '../../redux/playerActions';
import '../../style/Table.css';
import { usePlayerContext } from '../PlayerContext';

import Card from './Card'; 

const Table = ({ game, currentPlayerName }) => {
  const player1_id = game.creator_id;
  const player2_id = game.player2_id;
  const player3_id = game.player3_id;

  const dispatch = useDispatch();
  const { selectedPlayerId } = usePlayerContext(); 

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  const players = useSelector((state) => state.players.players);
  const player1Cards = useSelector((state) => state.deck.games[game.id]?.player1Cards || []);
  const player2Cards = useSelector((state) => state.deck.games[game.id]?.player2Cards || []);
  const player3Cards = useSelector((state) => state.deck.games[game.id]?.player3Cards || []);

  if (!Array.isArray(players)) {
    return <p>Error: Players data is not an array.</p>;
  }

  const player1 = players.find((player) => player.id === player1_id);
  const player2 = players.find((player) => player.id === player2_id);
  const player3 = players.find((player) => player.id === player3_id);

  // Dodajte logiku za prikaz karata samo za trenutnog igrača
  const currentPlayerCards = selectedPlayerId === player1_id
    ? player1Cards
    : selectedPlayerId === player2_id
    ? player2Cards
    : selectedPlayerId === player3_id
    ? player3Cards
    : [];

  return (
    <div>
      <GreenSurface
        gameId={game.id}
        // currentPlayerId={selectedPlayerId} // Koristite selectedPlayerId umesto currentPlayerId
        // currentPlayerName={currentPlayerName}
        player1Id={player1_id}
        player2Id={player2_id}
        player3Id={player3_id}
      />
      <div className="player-info">
        <div className="right-player">
          {selectedPlayerId === player2_id ? (
            <p>{player1 ? player1.name : 'Player 1'}</p>
          ) : selectedPlayerId === player3_id ? (
            <p>{player2 ? player2.name : 'Player 2'}</p>
          ) : selectedPlayerId === player1_id ? (
            <p>{player3 ? player3.name : 'Player 3'}</p>
          ) : (
            <p>{player3 ? player3.name : 'Player 3'}</p>
          )}
        </div>
        <div className="left-player">
          {selectedPlayerId === player1_id ? (
            <p>{player2 ? player2.name : 'Player 2'}</p>
          ) : selectedPlayerId === player2_id ? (
            <p>{player3 ? player3.name : 'Player 3'}</p>
          ) : selectedPlayerId === player3_id ? (
            <p>{player1 ? player1.name : 'Player 1'}</p>
          ) : (
            <p>{player1 ? player1.name : 'Player 1'}</p>
          )}
        </div>
      </div>
      <p>{currentPlayerName}</p>
      
      {/* Prikazivanje karata samo za trenutnog igrača */}
      <div className="player-cards">
        <div className="current-player-cards">
          {/* Mapiranje i renderovanje karata samo za trenutnog igrača */}
          {currentPlayerCards.map((card, index) => (
            <Card key={index} rank={card.rank} suit={card.suit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
