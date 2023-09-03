import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPlayer1Cards, setPlayer2Cards, setPlayer3Cards, setTableCards } from '../../redux/deckActions';
import { sendDealtCards } from '../../redux/deckActions'; // Uvezite akciju za slanje podataka na server
import AuctionPopup from './AuctionPopup';

const Deck = ({ gameId }) => {
  const dispatch = useDispatch();

  const [deck, setDeck] = useState([]);
  const [isAuctionOpen, setIsAuctionOpen] = useState(false); 
  const [dugmeKliknuto, setDugmeKliknuto] = useState(false);
  const [auctionGameId, setAuctionGameId] = useState(null); // Dodamo auctionGameId

  const createDeck = () => {
    const newDeck = [];
    const ranks = ['7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

    for (const rank of ranks) {
      for (const suit of suits) {
        newDeck.push({ rank, suit });
      }
    }
    setDeck(newDeck);
  };

  const shuffleDeck = () => {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    setDeck(shuffledDeck);
  };

  // Funkcija za sortiranje karata
  const sortCards = (cards) => {
    cards.sort((a, b) => {
      const suitsOrder = {
        'hearts': 0, 'diamonds': 1, 'clubs': 2, 'spades': 3
      };
      const suitComparison = suitsOrder[a.suit] - suitsOrder[b.suit];

      if (suitComparison === 0) {
        const ranksOrder = {
          '7': 0, '8': 1, '9': 2, '10': 3,
          'jack': 4, 'queen': 5, 'king': 6, 'ace': 7
        };
        return ranksOrder[a.rank] - ranksOrder[b.rank];
      }

      return suitComparison;
    });

    return cards;
  };

  const dealCards = async () => {
    const newTable = [];

    const player1Hand = [];
    const player2Hand = [];
    const player3Hand = [];

    for (let i = 0; i < 5; i++) {
      player1Hand.push(deck.pop());
      player2Hand.push(deck.pop());
      player3Hand.push(deck.pop());
    }

    newTable.push(deck.pop());
    newTable.push(deck.pop());

    // Drugo deljenje
    for (let i = 0; i < 5; i++) {
      player1Hand.push(deck.pop());
      player2Hand.push(deck.pop());
      player3Hand.push(deck.pop());
    }

    const sortedPlayer1Hand = sortCards(player1Hand);
    const sortedPlayer2Hand = sortCards(player2Hand);
    const sortedPlayer3Hand = sortCards(player3Hand);

    // Postavi stanje karata za svakog igrača u Redux store
    dispatch(setPlayer1Cards(gameId, sortedPlayer1Hand));
    dispatch(setPlayer2Cards(gameId, sortedPlayer2Hand));
    dispatch(setPlayer3Cards(gameId, sortedPlayer3Hand));

    // Postavi stanje karata na stolu u Redux store
    dispatch(setTableCards(gameId, newTable));

    // Nakon što ste ažurirali Redux store, pozovite Redux akciju za slanje stanja na server
    try {
      // Pozivamo Redux akciju za slanje stanja kada se podele karte na server
      await dispatch(sendDealtCards(gameId, { player1Hand, player2Hand, player3Hand, newTable }));
    } catch (error) {
      // Obradite greške ovde ako slanje ne uspe
      console.error('Greška pri slanju stanja kada se podele karte na server:', error);
    }
  };

  useEffect(() => {
    createDeck();
  }, []);

  const startGame = () => {
    shuffleDeck();
    dealCards();
    setDugmeKliknuto(true);
    startAuction();
  };

  // Dodamo funkciju za pokretanje aukcije
  const startAuction = () => {
    setAuctionGameId(gameId);
    setIsAuctionOpen(true);
  };
  
  return (
    <div>
      {dugmeKliknuto ? (
        // Prikazuje se nakon što se dugme klikne
        <div></div>
      ) : (
        // Prikazuje se dugme ako nije kliknuto
        <button onClick={startGame}>Podeli</button>
      )}
      {isAuctionOpen && <AuctionPopup gameId={auctionGameId} />}
    </div>
  );
};

export default Deck;
