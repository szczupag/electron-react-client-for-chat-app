
import {ipcRenderer} from 'electron';

import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import logo from './img/hmmm.png';

import './App.css';
import Main from './components/Main';

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
  }

  componentDidMount(){
    ipcRenderer.on('USERS_LIST',this.handleUsersList);
    ipcRenderer.on('NEW_USER',this.handleNewUser);
    ipcRenderer.on('MESSAGE',this.handleNewMessage);
  }

  componentWillUnmount(){
    ipcRenderer.removeListener('USERS_LIST',this.handleUsersList);
    ipcRenderer.removeListener('NEW_USER',this.handleNewUser);
    ipcRenderer.on('MESSAGE',this.handleNewMessage);

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
    console.log('[APP 400] new message received ',this.state.messages);
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
    ipcRenderer.send('SUBMIT_USERNAME',this.state.username);
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
    }else{
      content = 
        <Main 
          currentFriend={this.state.currentFriend}
          username={this.state.username}
          usersList={this.state.usersList}
          messages={this.state.messages}
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

