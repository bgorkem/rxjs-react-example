import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { messageService } from './messageService';

import './styles.css';

const sendMessage = () => {
  messageService.sendMessage(`${Date.now()}`);
};

const clearMessages = () => {
  messageService.clearMessages();
};

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscription = messageService.getMessage().subscribe(message => {
      if (message) {
        setMessages([...messages, message]);
      } else {
        setMessages([]);
      }

      return () => {
        subscription.dispose();
      };
    });
  });

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={sendMessage}>Send Message</button>
      <button onClick={clearMessages}>Clear Message</button>
      {messages.map((message, index) => (
        <div key={index} className="alert alert-success">
          {message.text}
        </div>
      ))}
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
