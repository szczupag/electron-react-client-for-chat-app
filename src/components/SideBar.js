import React, { Component } from 'react';
import UsersList from './UsersList';
import logo from '../img/hmmm.png';


class SideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      usersList: this.props.usersList
    }
  }

  componentWillReceiveProps(newProps){
    this.setState({
      usersList: newProps.usersList
    })
    console.log('[SIDE BAR] props received', this.state.usersList)
  }

  render() {
    return (
      <div className="side-bar">
        <div className="header">
          <img className="logo" src={logo} alt="logo"/>
          <div className="name">Hmm-Hmm</div>
        </div>
        <div className="login">{this.props.username}</div>
        <UsersList 
          usersList={this.state.usersList}
        />
      </div>
    );
  }
}

export default SideBar;
