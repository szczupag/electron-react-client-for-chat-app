import React from 'react'

class SendMessageForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messgae: ''
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.keyPressHandler = this.keyPressHandler.bind(this);
    }

    changeHandler(e){
        this.setState({message: e.target.value});
    }

    keyPressHandler(e){
        if(e.key == 'Enter'){
            this.props.handleSendMessage(this.state.message);
            this.setState({message: ''});
        }   
    }

    render() {
        return (
            <div className="send-message-form">
                <input
                    placeholder="Message"
                    type="text"
                    value={this.state.message}
                    onChange={(e)=>this.changeHandler(e)}
                    onKeyPress={(e)=>this.keyPressHandler(e)}
                    />
            </div>
        )
    }
}

export default SendMessageForm