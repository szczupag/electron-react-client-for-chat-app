import React, { Component } from 'react';
import SideBar from './SideBar';
import ChatBar from './ChatBar';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      usersList: this.props.usersList,
      messages: this.props.messages,
      currentFriend: this.props.currentFriend
    }
    this.currentUserHandler = this.currentUserHandler.bind(this)
  }

  componentWillReceiveProps(newProps){
    this.setState({
      usersList: newProps.usersList,
      messages: newProps.messages,
      currentFriend: newProps.currentFriend
    })
    console.log('[MAIN] props received')
  }

  currentUserHandler(user){
    this.setState({
        currentFriend: user
    })
  }
  
  render() {
    return (
      <div className="main">
        <SideBar 
          usersList={this.state.usersList}
          username={this.props.username}
          currentFriend={this.state.currentFriend}
          currentUserHandler={this.currentUserHandler}
        />
        <ChatBar 
          messages={this.state.messages}
          username={this.props.username}
          currentFriend={this.state.currentFriend}
        />
      </div>
    );
  }
}

export default Main;
