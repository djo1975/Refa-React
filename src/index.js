import React from 'react';
import { StrictMode } from 'react';
import { Provider } from 'react-redux'; // Importuj Provider iz react-redux
import ReactDOM from 'react-dom/client';
import App from './App';
import { PlayerProvider } from './components/PlayerContext';
import store, { persistor } from './redux/store'; // Uvezite persistor iz Redux store-a
import { PersistGate } from 'redux-persist/integration/react'; 

const initialPlayerId =3;

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> 
      <PlayerProvider initialPlayerId={initialPlayerId}>
        <App />
      </PlayerProvider>
    </PersistGate> 
  </Provider>
</StrictMode>,
);
