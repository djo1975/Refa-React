import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChips } from '../redux/chipActions';
import { usePlayerContext } from './PlayerContext'; // Import the usePlayerContext hook
import axios from 'axios';

function ChipManager() {
  const dispatch = useDispatch();
  const selectedPlayerId = usePlayerContext().selectedPlayerId; 
  const availableChips = useSelector(state => state.chips);

  const [chipsToAdd, setChipsToAdd] = useState(0);

  const handleAddChips = async (amount) => {
    try {
      // Send a request to add chips to the player
      const response = await axios.post(`http://localhost:3000/chips/${selectedPlayerId}/add_chips?chips=${amount}`);
      if (response.ok) {
        // Update Redux store with added chips
        dispatch(addChips(amount));
        setChipsToAdd(0);
        console.log('Chips added successfully.');
      } 
    } catch (error) {
      console.error('Error adding chips:', error);
    }
  };

  return (
    <div>
      <h3>Chip Manager</h3>
      <p>Available Chips: {availableChips}</p>
      <input
        type="number"
        value={chipsToAdd}
        onChange={e => setChipsToAdd(parseInt(e.target.value, 10))}
      />
      <button onClick={() => handleAddChips(chipsToAdd)}>Add Chips</button>

      <div>
        <h4>Select Chip Amount</h4>
        <button onClick={() => setChipsToAdd(1000)}>1000 Chips</button>
        <button onClick={() => setChipsToAdd(2000)}>2000 Chips</button>
        <button onClick={() => setChipsToAdd(5000)}>5000 Chips</button>
        <button onClick={() => setChipsToAdd(10000)}>10000 Chips</button>
      </div>
    </div>
  );
}

export default ChipManager;
