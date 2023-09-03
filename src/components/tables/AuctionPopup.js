import React, { useCallback } from 'react';
import '../../style/AuctionPopup.css';
import { usePlayerContext } from '../PlayerContext';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentPlayer, addReadyPlayer, endAuction } from '../../redux/auctionActions';

const AuctionPopup = (props) => {
  const dispatch = useDispatch();
  const auctionState = useSelector(state => state.auctions);

  const selectedPlayerId = usePlayerContext().selectedPlayerId;

  const player1Id = props.player1Id;
  const player2Id = props.player2Id;
  const player3Id = props.player3Id;

  // Definišite redosled igranja
  const playerOrder = [player1Id, player2Id, player3Id];

  // Funkcija za određivanje dostupnih dugmadi za trenutnog igrača
  const getAvailableButtons = useCallback((playerId) => {
    if (playerId === selectedPlayerId) {
      // Trenutni igrač ima dostupna dugmad
      return ['IGRA', '2 pik', 'DALJE'];
    }
    return [];
  }, [selectedPlayerId]);

  // Dobijanje dostupnih dugmadi za trenutnog igrača
  const availableButtons = getAvailableButtons(selectedPlayerId);

  // Obrada klika na dugme
  const handleButtonClick = (buttonText) => {
    const { currentPlayerIndex, isAuctionActive } = auctionState;
  
    if (isAuctionActive) {
      if (buttonText === 'DALJE') {
        // Trenutni igrač je izabrao "DALJE", dispečiramo Redux akciju za dodavanje igrača u listu spremnih
        dispatch(addReadyPlayer(playerOrder[currentPlayerIndex]));
      
        // Proverimo da li su svi igrači izabrali "DALJE", i ako jesu, dispečiramo Redux akciju za završetak aukcije
        if (auctionState.readyPlayers.length === playerOrder.length - 1) {
          dispatch(endAuction());
        } else {
          // Prebacimo kontrolu na sledećeg igrača
          const nextPlayerIndex = (currentPlayerIndex + 1) % playerOrder.length;
          console.log(`Trenutni igrač na potezu je ${playerOrder[nextPlayerIndex]}`);
          dispatch(changeCurrentPlayer(nextPlayerIndex)); // Dodajte Redux akciju za promenu trenutnog igrača
          console.log(`Igrač ${playerOrder[currentPlayerIndex]} je izabrao DALJE.`);
        }
      }
      

      // Proverimo da li su svi igrači izabrali "DALJE", i ako jesu, dispečiramo Redux akciju za završetak aukcije
      if (auctionState.readyPlayers.length === playerOrder.length - 1) {
        dispatch(endAuction());
      }
    }
  };
  

  return (
    <div>
      <div className="auction-panel">
        {availableButtons.map((buttonText) => (
          <button
            key={buttonText}
            onClick={() => handleButtonClick(buttonText)}
            disabled={!auctionState.isAuctionActive || auctionState.currentPlayerIndex !== playerOrder.indexOf(selectedPlayerId)}
          >
            {buttonText}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AuctionPopup;
