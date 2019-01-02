
import {ipcRenderer} from 'electron';

import React, { Component } from 'react';
import logo from './assets/img/hmmm.png';

import './App.css';
import Main from './components/Main';
const constants = require('./constants');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      host: '127.0.0.1',
      port: '1234',
      submitClass: ' disabled-btn',
      isLogged: false,
      isConnected: false,
      validConnection: true,
      usersList: undefined,
      messages: [],
      currentFriend: 'no friends online'
    };
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.hostChangeHandler = this.hostChangeHandler.bind(this);
    this.portChangeHandler = this.portChangeHandler.bind(this);
    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);
    this.handleConnection = this.handleConnection.bind(this);
    this.handleUsersList = this.handleUsersList.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.handleUserLeft = this.handleUserLeft.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.currentUserHandler = this.currentUserHandler.bind(this);
    this.handleServerDisconnected = this.handleServerDisconnected.bind(this);
    this.handleServerConnected = this.handleServerConnected.bind(this);
    this.handleServerConnectionFailure = this.handleServerConnectionFailure.bind(this);
  }

  componentDidMount(){
    ipcRenderer.on(constants.USERS_LIST,this.handleUsersList);
    ipcRenderer.on(constants.NEW_USER,this.handleNewUser);
    ipcRenderer.on(constants.MESSAGE_RECEIVED,this.handleNewMessage);
    ipcRenderer.on(constants.USER_LEFT,this.handleUserLeft);
    ipcRenderer.on(constants.SERVER_DISCONNECTED,this.handleServerDisconnected);
    ipcRenderer.on(constants.SERVER_CONNECTED, this.handleServerConnected);
    ipcRenderer.on(constants.SERVER_CONNECTION_FAILURE, this.handleServerConnectionFailure);
  }

  componentWillUnmount(){
    ipcRenderer.removeListener(constants.USERS_LIST,this.handleUsersList);
    ipcRenderer.removeListener(constants.NEW_USER,this.handleNewUser);
    ipcRenderer.removeListener(constants.MESSAGE_RECEIVED,this.handleNewMessage);
    ipcRenderer.removeListener(constants.USER_LEFT,this.handleUserLeft);
    ipcRenderer.removeListener(constants.SERVER_DISCONNECTED,this.handleServerDisconnected);
    ipcRenderer.removeListener(constants.SERVER_CONNECTED, this.handleServerConnected);
    ipcRenderer.removeListener(constants.SERVER_CONNECTION_FAILURE, this.handleServerConnectionFailure);
  }

  //200;newuser
  handleNewUser(event, data){
    var strData = data + '';
    var arrayData = strData.split(";");
    if(this.state.usersList!=undefined){
      var newUsersList = [...this.state.usersList, arrayData[1]];
      this.setState({
        usersList: newUsersList,
        currentFriend: newUsersList[0]
      })
    }else{
      var newUsersList = [arrayData[1]];
      this.setState({
        usersList: newUsersList,
        currentFriend: arrayData[1]
      })
    }
    console.log('[APP 200] new user append ',this.state.usersList);
  }

  //300;user
  handleUserLeft(event,data){
    var strData = data + '';
    var arrayData = strData.split(";");
    var newUsersList = this.state.usersList.filter((user)=>{
      return user != arrayData[1];
    })
    if(newUsersList.length != 0){
      this.setState({
        usersList: newUsersList,
      })
    } else {
      this.setState({
        usersList: undefined,
        currentFriend: 'no friends online'
      })
    }
    console.log('[APP 300] user left',arrayData[1], newUsersList.length);
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
    arrayData.splice(-1,1);
    if(arrayData[0]!=undefined){
      this.setState({
        usersList: arrayData,
        currentFriend: arrayData[0]
      })
    }else{
      this.setState({
        usersList: undefined,
        currentFriend: 'no friends online'
      })
    }
    console.log('[APP 500] users list received', this.state.usersList);
  }

  //600;
  handleServerDisconnected(){
    this.setState({isConnected: false});
  }

  handleServerConnected(){
    this.setState({
      isConnected: true
    });
  }

  handleServerConnectionFailure(){
    this.setState({validConnection: false})
  }

  //to;message
  handleSendMessage(message){
    var strData = this.state.currentFriend+";"+message+";";
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

  hostChangeHandler(event){
    if(event.target.value !== ''){
      this.setState({
        host: event.target.value,
      })
    } else {
      this.setState({
        host: event.target.value,
      })
    }
  }

  portChangeHandler(event){
    if(event.target.value !== ''){
      this.setState({
        port: event.target.value,
      })
    } else {
      this.setState({
        port: event.target.value,
      })
    }
  }

  usernameChangeHandler(event){
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

  handleUsernameSubmit(){
    this.setState({isLogged: true});
    ipcRenderer.send(constants.SUBMIT_USERNAME,this.state.username);
  }

  handleConnection(){
    var connectionData = {
      port: this.state.port,
      host: this.state.host
    }
    ipcRenderer.send(constants.CONNECT,connectionData);
  }

  currentUserHandler(user){
    this.setState({
        currentFriend: user
    })
  }

  render() {
    var isValidConnection = this.state.validConnection;
    var isConnected = this.state.isConnected;
    var isLogged = this.state.isLogged;
    let content;
    let error;
    if(!isValidConnection){
      error = <p className="error-msg">Couldn't connect to the server</p>
    }
    if(!isConnected && isLogged){
      content = 
        <div className="welcome">
          <div className="header">
            <img className="logo" src={logo} alt="logo"/>
            <div className="name">Hmm-Hmm</div>
          </div>
          <div className="login-form">
            <p>Server not available!</p>
          </div>
        </div> 
    }else if(!isConnected && !isLogged){
        content = 
          <div className="welcome">
            <div className="header">
              <img className="logo" src={logo} alt="logo"/>
              <div className="name">Hmm-Hmm</div>
            </div>
            <div className="login-form">
              <input 
                className="login-host" 
                placeholder="Host" 
                value={this.state.host} 
                onChange={(event) => this.hostChangeHandler(event)}></input>
              <input 
                className="login-port" 
                placeholder="Port" 
                value={this.state.port} 
                onChange={(event) => this.portChangeHandler(event)}></input>
              <a
                className={"login-button"} 
                onClick={this.handleConnection}
                >
                Connect
              </a>
              {error}
            </div>
          </div> 
    } else if (isConnected && !isLogged){
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
                  onChange={(event) => this.usernameChangeHandler(event)}></input>
                <a
                  id="connectBtn"
                  className={"login-button"+this.state.submitClass} 
                  onClick={this.handleUsernameSubmit}
                  >
                  Submit
                </a>
              </div>
            </div> 
      } else if (isConnected && isLogged){
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

