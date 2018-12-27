import React from 'react'

const DUMMY_DATA = [
    {
        senderId: 'username',
        text: 'Siemka co tam'
    },
    {
        senderId: 'username',
        text: 'No elo'
    },
    {
        senderId: 'username',
        text: 'Dupa dupa'
    }
]

class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
                {DUMMY_DATA.map((message, index)=>{
                    return (
                        <div
                            className="message"
                            key={index}>
                            <div className="message-username">{message.senderId}</div>
                            <div className="message-text">{message.text}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default MessageList