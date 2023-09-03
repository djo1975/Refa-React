import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ExitGameButton from './ExitGameButton';
import JoinGameButton from './JoinGameButton';
import JoinGameButton3 from './JoinGameButton3';
import SmallExitGameButton from './SmallExitButton';
import { usePlayerContext } from './PlayerContext';
import { updateGames } from './../redux/gameActions';
import Chat from './Chat'; 

const GameList = () => {
  const { selectedPlayerId } = usePlayerContext();
  const games = useSelector(state => state.games);
  const dispatch = useDispatch();

  useEffect(() => {
    // Dohvati listu igara sa servera i ažuriraj Redux store
    async function fetchGames() {
      try {
        const response = await fetch('http://127.0.0.1:3000/games');
        const data = await response.json();
        dispatch(updateGames(data));
      } catch (error) {
        console.error('Greška prilikom dohvatanja igara:', error);
      }
    }
    fetchGames();
  }, [dispatch]); // Dodajte dispatch kao zavisnost

  const handleGameExited = (gameId) => {
    // Ažuriraj listu igara nakon izlaska iz igre
    const updatedGames = games.filter(game => game.id !== gameId);
    dispatch(updateGames(updatedGames));
  };

  const handleGameJoined = async (gameId) => {
    try {
      // Ažuriraj listu igara nakon pristupa igri
      const updatedGames = games.map(game => {
        if (game.id === gameId) {
          return { ...game, status: 'pending' };
        }
        return game;
      });
      dispatch(updateGames(updatedGames));
  
      // Nakon ažuriranja, zatraži ponovo podatke sa servera kako bi se osvežili
      const response = await fetch('http://127.0.0.1:3000/games');
      const data = await response.json();
      dispatch(updateGames(data));
    } catch (error) {
      console.error('Greška prilikom dohvatanja igara:', error);
    }
  };

  const handleSmallExit = async (gameId) => {
    try {
      const updatedGames = games.map(game => {
        if (game.id === gameId) {
          return { ...game, player2_id: null };
        }
        return game;
      });
  
      dispatch(updateGames(updatedGames));
  
      // Nakon ažuriranja Redux store-a, možete izvršiti ponovno dohvatanje
      // igara sa servera kako bi se osvežila lista igara.
      const response = await fetch('http://127.0.0.1:3000/games');
      const data = await response.json();
      dispatch(updateGames(data));
    } catch (error) {
      console.error('Greška:', error);
    }
  };
  
  
  return (
    <div>
      <h2>Lista igara</h2>
  
      <ul>
        {games.map(game => (
          <li key={game.id}>
            Igra ID: {game.id}- Buli: {game.buli}, Ref Count: {game.ref_count}, Kreator_id: {game.creator_id}, Player2_id: {game.player2_id}, Player3_id: {game.player3_id}
            <div>
            {game.status === 'active' && (
              <button>Kibic</button>
            )}  
             {(selectedPlayerId === game.creator_id || game.status === 'pending') && (
                <ExitGameButton gameId={game.id} creatorId={game.creator_id} onExit={() => handleGameExited(game.id)} />
              )}
            </div>
            {game.status === 'pending' && selectedPlayerId !== game.creator_id && game.player2_id !== selectedPlayerId && game.player3_id !== selectedPlayerId ? (
              <div>
                {game.player2_id === null && game.player3_id === null ? (
                  <JoinGameButton gameId={game.id} playerSlot="player2_id" onJoin={() => handleGameJoined(game.id)} />
                ) : game.player2_id === null ? (
                  <JoinGameButton gameId={game.id} playerSlot="player2_id" onJoin={() => handleGameJoined(game.id)} />
                ) : game.player3_id === null ? (
                  <JoinGameButton3 gameId={game.id} onJoin={() => handleGameJoined(game.id)} /> 
                ) : null} 
              </div>
            ) : null}
            {(selectedPlayerId === game.player2_id && game.status === 'pending') && (
              <div>
              <SmallExitGameButton gameId={game.id} game={game} onExit={() => handleSmallExit(game.id)} />
            </div>            
            )}
            
          </li>
        ))}
        
      </ul>
      <div className="chat-section">
      <h2>Chat</h2>
      <Chat /> {/* Render the Chat component */}
    </div>
    </div>
  );
}

export default GameList;
