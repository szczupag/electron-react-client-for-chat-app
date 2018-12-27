import React, { Component } from 'react';
import SideBar from './SideBar';
import ChatBar from './ChatBar';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      usersList: this.props.usersLists
    }
  }

  componentWillReceiveProps(props){
    this.setState({
      usersList: props.usersList
    })
  }
  
  render() {
    return (
      <div className="main">
        <SideBar 
          usersList={this.state.usersList}
          username={this.props.username}/>
        <ChatBar />
      </div>
    );
  }
}

export default Main;
