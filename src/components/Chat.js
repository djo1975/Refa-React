import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Dodali smo axios za slanje HTTP zahteva
import { usePlayerContext } from './PlayerContext';

import '../style/Chat.css';

function Chat() {
  const [newMessage, setNewMessage] = useState('');
  const [lastMessages, setLastMessages] = useState([]);

  const { currentPlayerName } = usePlayerContext();

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const data = { user: currentPlayerName, content: newMessage };

      try {
        const response = await axios.post('http://localhost:3000/chat_messages', { chat_message: data });
        console.log('Message sent:', response.data);
        setNewMessage('');

        // Nakon slanja poruke, ponovo preuzmi poslednje poruke
        fetchLastMessages();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }

  const fetchLastMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/chat_messages');
      setLastMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchLastMessages();
  }, []);

  return (
    <div className="chat">
      <div className="chat-messages">
        {lastMessages.map((message, index) => (
          <div key={index} className="chat-message">
            <span className="username">{message.user}: </span>
            <span className="content">{message.content}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Unesite poruku..."
        />
        <button onClick={handleSendMessage}>Pošalji</button>
      </div>
    </div>
  );
}

export default Chat;
