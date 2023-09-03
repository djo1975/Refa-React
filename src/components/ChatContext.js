import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const sendMessage = (message) => {
    if (currentUser && message.trim() !== '') {
      setMessages([...messages, { user: currentUser, content: message }]);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, currentUser, setCurrentUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
