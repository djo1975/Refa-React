// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameReducers';
import playerReducer from './playerReducer';
import chipReducer from './chipReducer';
import { chatSlice } from './chatSlice';
import deckReducers from './deckReducers';
import auctionReducer from './auctionReducer';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Vaši reducer-i
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  games: gameReducer,
  players: playerReducer,
  chips: chipReducer,
  chat: chatSlice.reducer,
  deck: deckReducers,
  auctions: auctionReducer,
});


const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux store
const store = configureStore({
  reducer: persistedReducer, // Koristi persistedReducer
  middleware: [thunk],
});

// Perzistencija Redux-a
export const persistor = persistStore(store);

export default store;
