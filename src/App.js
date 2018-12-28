
import {ipcRenderer} from 'electron';

import React, { Component } from 'react';
import logo from './img/hmmm.png';

import './App.css';
import Main from './components/Main';
const constants = require('./constants');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      submitClass: ' disabled-btn',
      isLogged: false,
      usersList: undefined,
      messages: [],
      currentFriend: 'no friends online'
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsersList = this.handleUsersList.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.handleUserLeft = this.handleUserLeft.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.currentUserHandler = this.currentUserHandler.bind(this);
  }

  componentDidMount(){
    ipcRenderer.on(constants.USERS_LIST,this.handleUsersList);
    ipcRenderer.on(constants.NEW_USER,this.handleNewUser);
    ipcRenderer.on(constants.MESSAGE_RECEIVED,this.handleNewMessage);
    ipcRenderer.on(constants.USER_LEFT,this.handleUserLeft);
  }

  componentWillUnmount(){
    ipcRenderer.removeListener(constants.USERS_LIST,this.handleUsersList);
    ipcRenderer.removeListener(constants.NEW_USER,this.handleNewUser);
    ipcRenderer.removeListener(constants.MESSAGE_RECEIVED,this.handleNewMessage);
    ipcRenderer.removeListener(constants.USER_LEFT,this.handleUserLeft);
  }

  //200;newuser
  handleNewUser(event, data){
    var strData = data + '';
    var arrayData = strData.split(";");
    var newUsersList = [...this.state.usersList, arrayData[1]]
    this.setState({
      usersList: newUsersList
    })
    console.log('[APP 200] new user append ',this.state.usersList);
  }

  //300;user
  handleUserLeft(event,data){
    var strData = data + '';
    var arrayData = strData.split(";");
    var newUsersList = this.state.usersList.filter((user)=>{
      return user != arrayData[1];
    })
    this.setState({
      usersList: newUsersList
    })
    console.log('[APP 300] user left',arrayData[1]);
  }

  //400;user;message
  handleNewMessage(event, data){
    var strData = data + '';
    var arrayData = strData.split(";");
    var newMessage = {
      from: arrayData[1],
      to: this.state.username,
      message: arrayData[2]
    }
    var newMessages = [...this.state.messages, newMessage]
    this.setState({
      messages: newMessages
    })
    console.log('[APP 400] new message received ',arrayData[2]);
  }

  //500;user1;user2...
  handleUsersList(event, data){
    var strData = data + '';
    var arrayData = strData.split(";");
    arrayData.shift();
    this.setState({
      usersList: arrayData,
      currentFriend: arrayData[0]
    })
    console.log('[APP 500] users list received', this.state.usersList);
  }

  //to;message
  handleSendMessage(message){
    var strData = this.state.currentFriend+";"+message;
    ipcRenderer.send(constants.WRITE_MESSAGE,strData);
    var newMessage = {
      from: this.state.username,
      to: this.state.currentFriend,
      message: message
    }
    var newMessages = [...this.state.messages, newMessage]
    this.setState({
      messages: newMessages
    })
    console.log("[APP] message send",strData);
  }

  inputChangeHandler(event){
    if(event.target.value !== ''){
      this.setState({
        username: event.target.value,
        submitClass: ''
      })
    } else {
      this.setState({
        username: event.target.value,
        submitClass: ' disabled-btn'
      })
    }
  }

  handleSubmit(){
    this.setState({isLogged: true});
    ipcRenderer.send(constants.SUBMIT_USERNAME,this.state.username);
  }

  currentUserHandler(user){
    this.setState({
        currentFriend: user
    })
  }

  render() {
    var isLogged = this.state.isLogged;
    let content;
    if(!isLogged) {
      content = 
      <div className="welcome">
            <div className="header">
              <img className="logo" src={logo} alt="logo"/>
              <div className="name">Hmm-Hmm</div>
            </div>
            <div className="login-form">
              <input 
                id="usernameInput"
                className="login-username" 
                placeholder="Username" 
                value={this.state.username} 
                onChange={(event) => this.inputChangeHandler(event)}></input>
              <a
                id="connectBtn"
                className={"login-button"+this.state.submitClass} 
                onClick={this.handleSubmit}
                >
                Submit
              </a>
            </div>
          </div> 
    } else {
      content = 
        <Main 
          currentFriend={this.state.currentFriend}
          username={this.state.username}
          usersList={this.state.usersList}
          messages={this.state.messages}
          handleSendMessage={this.handleSendMessage}
          currentUserHandler={this.currentUserHandler}
          />
    }
    return (
        <div className="App">
          {content}
        </div>
    );
  }
}

export default App;

