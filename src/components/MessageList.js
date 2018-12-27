import React from 'react'

class MessageList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          messages: this.props.messages,
          currentFriend: this.props.currentFriend
        }
      }
    
    componentWillReceiveProps(newProps){
        this.setState({
            messages: newProps.messages,
            currentFriend: newProps.currentFriend
        })
        console.log('[MESSAGE LIST] props received')
    }

    render() {
        return (
            <div className="message-list">
                {this.state.messages.map((message, index)=>{
                    if(message.from == this.state.currentFriend && message.to == this.props.username){
                        return (
                            <div
                                className="message from-current-friend"
                                key={index}>
                                <div className="message-username">{message.from}</div>
                                <div className="message-text">{message.message}</div>
                            </div>
                        )
                    }else if (message.to == this.state.currentFriend && message.from == this.props.username){
                        return (
                            <div
                                className="message to-current-friend"
                                key={index}>
                                <div className="message-username">{message.from}</div>
                                <div className="message-text">{message.message}</div>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
}

export default MessageList