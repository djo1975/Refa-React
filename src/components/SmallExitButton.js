import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateGames } from '../redux/gameActions'; // Dodajte ovaj import

const SmallExitGameButton = ({ gameId, game, onExit }) => {
    const dispatch = useDispatch();

    const handleSmallExit = async () => {
        try {
            // Pošalji zahtev za izlazak iz igre na server
            await axios.put(`http://127.0.0.1:3000/games/${game.id}`, { player2_id: null });

            // Ažuriraj Redux store
            const updatedGame = { ...game, player2_id: null };
            dispatch(updateGames([updatedGame]));

            // Ako je igra u statusu 'pending', refundiraj čipove player2-ju
            if (game.status === 'pending' && game.player2_id) {
                const refundResponse = await axios.post(`http://localhost:3000/chips/${game.player2_id}/refund_chips?chips=${game.buli}`);
                console.log(`Refund request for player2 (${game.player2_id}):`, refundResponse.data);
            }

            // Pozovi funkciju za izlazak koju je prosledio roditeljski komponent
            onExit();
        } catch (error) {
            console.error('Greška prilikom izlaska iz igre:', error);
        }
    };

    return (
        <button onClick={handleSmallExit}>Izađi iz igre</button>
    );
}

export default SmallExitGameButton;
