import React from "react";
import ReactDOM from "react-dom";

import { messageService } from "./messageService";

import "./styles.css";

class App extends React.Component {
  state = {
    messages: []
  };

  componentDidMount() {
    // subscribe to home component messages
    this.subscription = messageService.getMessage().subscribe(message => {
      if (message) {
        // add message to local state if not empty
        this.setState({ messages: [...this.state.messages, message] });
      } else {
        // clear messages when empty message received
        this.setState({ messages: [] });
      }
    });
  }

  componentWillUnmount() {
    this.subscription.dispose();
  }

  sendMessage(e) {
    messageService.sendMessage(`${Date.now()}`);
  }

  clearMessages(e) {
    messageService.clearMessages();
  }

  render() {
    const { messages } = this.state;
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <button onClick={this.sendMessage}>Send Message</button>
        <button onClick={this.clearMessages}>Clear Message</button>
        {messages.map((message, index) => (
          <div key={index} className="alert alert-success">
            {message.text}
          </div>
        ))}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
