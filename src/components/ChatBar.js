import React, { Component } from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';


class ChatBar extends Component {
  render() {
    return (
      <div className="chat-bar">
        <MessageList />
        <SendMessageForm />
      </div>
    );
  }
}

export default ChatBar;
