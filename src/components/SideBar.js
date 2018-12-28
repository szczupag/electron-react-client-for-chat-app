import React, { Component } from 'react';
import UsersList from './UsersList';
import logo from '../img/hmmm.png';


class SideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      usersList: this.props.usersList,
      currentFriend: this.props.currentFriend
    }
  }

  componentWillReceiveProps(newProps){
    this.setState({
      usersList: newProps.usersList,
      currentFriend: newProps.currentFriend
    })
  }

  render() {
    return (
      <div className="side-bar">
        <div className="header">
          <img className="logo" src={logo} alt="logo"/>
          <div className="name">Hmm-Hmm</div>
        </div>
        <div className="login">Howdy, {this.props.username}!</div>
        <UsersList 
          currentUserHandler={this.props.currentUserHandler}
          usersList={this.state.usersList}
          currentFriend={this.state.currentFriend}
        />
      </div>
    );
  }
}

export default SideBar;
