import React, { Component } from 'react';
import SideBar from './SideBar';
import ChatBar from './ChatBar';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      usersList: this.props.usersList,
      messages: this.props.messages,
      currentFriend: this.props.currentFriend,
    }
  }

  componentWillReceiveProps(newProps){
    this.setState({
      usersList: newProps.usersList,
      messages: newProps.messages,
      currentFriend: newProps.currentFriend
    })
  }
  
  render() {
    return (
      <div className="main">
        <SideBar 
          usersList={this.state.usersList}
          username={this.props.username}
          currentFriend={this.state.currentFriend}
          currentUserHandler={this.props.currentUserHandler}
        />
        <ChatBar 
          messages={this.state.messages}
          username={this.props.username}
          currentFriend={this.state.currentFriend}
          handleSendMessage={this.props.handleSendMessage}
        />
      </div>
    );
  }
}

export default Main;
