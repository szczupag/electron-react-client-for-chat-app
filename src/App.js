
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
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsersList = this.handleUsersList.bind(this);
  }

  componentDidMount(){
    ipcRenderer.on('USERS_LIST',this.handleUsersList);
  }

  componentWillUnmount(){
    ipcRenderer.removeListener('USERS_LIST',this.handleUsersList);
  }

  handleUsersList(event, data){
    var strData = data + '';
    var arrayData = strData.split(";");
    arrayData.shift();
    this.setState({
      usersList: arrayData
    })
    console.log('[APP] users list received', this.state.usersList);
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
          username={this.state.username}
          usersList={this.state.usersList}
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

