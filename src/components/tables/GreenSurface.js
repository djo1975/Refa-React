import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';
import Deck from './Deck';
import '../../style/GreenSurface.css';
import { usePlayerContext } from '../PlayerContext';
import AuctionPopup from './AuctionPopup';

const GreenSurface = (props) => {
  // Koristite useSelector hook da biste pristupili tableCards iz Redux stanja
  const tableCards = useSelector((state) => state.deck.games[props.gameId]?.tableCards || []);

  // Koristimo PlayerContext za dobijanje trenutnog korisnika
  const { selectedPlayerId } = usePlayerContext();

  // Proverite da li je trenutni korisnik player3
  const isPlayer3 = selectedPlayerId === props.player3Id;

  // Lokalno stanje za praćenje da li je kliknuto na dugme "Prikaži"
  const [showCards, setShowCards] = useState(false);

  const toggleShowCards = () => {
    setShowCards(!showCards);
  };

  return (
    <div className="green-surface">
    <AuctionPopup
    gameId={props.gameId}
    player1Id={props.player1Id}
    player2Id={props.player2Id}
    player3Id={props.player3Id}
  />
      {isPlayer3 && <Deck gameId={props.gameId} />}
      <div>
        <button onClick={toggleShowCards}>
          {showCards ? 'Sakrij Karte' : 'Prikaži Karte'}
        </button>
      </div>
      <div className="card-container">
        {tableCards.map((card, index) => (
          <Card
            key={index}
            rank={showCards ? card.rank : 'back'}
            suit={showCards ? card.suit : '2x'}
            className={showCards ? 'card' : 'card-back'} 
          />
        ))}
      </div>
    </div>
  );
};

export default GreenSurface;
