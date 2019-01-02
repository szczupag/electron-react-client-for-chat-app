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
        this.scrollToBottom();
    }

    scrollToBottom(){
        this.messagesEnd.scrollIntoView({behavior: "smooth"});
    }

    render() {
        var messagesToDisplay = this.state.messages.map((message, index)=>{
            if(message.from == this.state.currentFriend && message.to == this.props.username){
                return (
                    <div
                        className="message from-current-friend"
                        key={index}>
                        <div className="message-username">{message.from}</div>
                        <div className="message-text"><p>{message.message}</p></div>
                    </div>
                )
            }else if (message.to == this.state.currentFriend && message.from == this.props.username){
                return (
                    <div
                        className="message to-current-friend"
                        key={index}>
                        <div className="message-username">{message.from}</div>
                        <div className="message-text"><p>{message.message}</p></div>
                    </div>
                )
            }
        });
        if(messagesToDisplay.length == 0){
            messagesToDisplay = <p className="empty-messages-list">There are no messages yet! Start typing below</p>
        }
        return (
            <div className="message-list">
                {messagesToDisplay}
                <div 
                    style={{float:"left", clear:"both"}}
                    ref={(el)=>{this.messagesEnd = el}}>
                </div>
            </div>
        )
    }
}

export default MessageList