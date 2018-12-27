import React from 'react';
import avatar from '../img/hugging.png';

class UsersList extends React.Component {
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

    render () {
        if (this.state.usersList!==undefined){
            return (
                <div className="users-list">
                    {
                        this.state.usersList.map((user, index)=>{
                            var isActive = '';
                            if(user==this.state.currentFriend){
                                isActive = ' active';
                            }
                            return (
                                <div
                                    className={"user"+isActive}
                                    key={index}
                                    onClick={()=>this.props.currentUserHandler(user)}
                                >
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