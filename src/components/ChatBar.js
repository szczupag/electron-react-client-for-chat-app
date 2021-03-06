import React, { Component } from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';


class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: this.props.messages,
      currentFriend: this.props.currentFriend
    }
  }

  componentWillReceiveProps(newProps){
    this.setState({
      messages: newProps.messages,
      currentFriend: newProps.currentFriend
    })
  }

  render() {
    return (
      <div className="chat-bar">
        <MessageList 
          messages={this.state.messages}
          username={this.props.username}
          currentFriend={this.state.currentFriend}
        />
        <SendMessageForm
          handleSendMessage={this.props.handleSendMessage}          
        />
      </div>
    );
  }
}

export default ChatBar;
