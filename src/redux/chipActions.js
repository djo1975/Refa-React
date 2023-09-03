
// src/redux/chipActions.js
export const deductChips = (amount) => ({
    type: 'DEDUCT_CHIPS',
    payload: amount,
  });
  
  export const refundChips = (amount) => ({
    type: 'REFUND_CHIPS',
    payload: amount,
  });
  
  export const addChips = (amount) => ({
    type: 'ADD_CHIPS',
    payload: amount,
  });
  