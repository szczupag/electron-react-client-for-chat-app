import React from 'react';
import avatar from '../img/hugging.png';

class UsersList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          usersList: this.props.usersList
        }
      }
    
    componentWillReceiveProps(props){
        this.setState({
            usersList: props.usersList
        })
    }

    render () {
        if (this.props.usersList!==undefined){
            return (
                <div className="users-list">
                    {
                        this.props.usersList.map((user, index)=>{
                            return (
                                <div
                                    className="user"
                                    key={index}>
                                    <img className="user-avatar" src={avatar} alt="img"/>
                                    <div className="user-username">{user}</div>
                                </div>
                            )})
                    }
                </div>
            )
        } else {
            return (
                <div className="users-list">
                    <span>No friends online</span>
                </div>
            )
        }
    }
}

export default UsersList