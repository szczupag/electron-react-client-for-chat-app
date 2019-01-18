import React, {Component} from 'react';
import constants from '../../constants/pages';

class EditVisitor extends Component {
    constructor(props){
        super(props)
        this.state={
            firstName: this.props.data.firstName,
            lastName: this.props.data.lastName,
            pesel: this.props.data.pesel,
            idNumber: this.props.data.idNumber,
            visitsIds: this.props.data.visits,
            error: null
        }
        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
        this.peselChangeHandler = this.peselChangeHandler.bind(this);
        this.idNumberChangeHandler = this.idNumberChangeHandler.bind(this);
        this.visitsChangeHandler = this.visitsChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    firstNameChangeHandler(e){
        this.setState({firstName: e.target.value})
    }

    lastNameChangeHandler(e){
        this.setState({lastName: e.target.value})
    }

    peselChangeHandler(e){
        this.setState({pesel: e.target.value})
    }

    idNumberChangeHandler(e){
        this.setState({idNumber: e.target.value});
    }

    visitsChangeHandler(e){
        this.setState({visits: e.target.value});
    }

    submitHandler(){
        if( this.state.firstName != '' && this.state.lastName!='' ){
            if( this.state.firstName != this.props.data.firstName || this.state.lastName != this.props.data.lastName || this.state.idNumber != this.props.data.idNumber || this.state.pesel != this.props.data.pesel){
                const data = {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    pesel: this.props.data.pesel,
                    idNumber: this.state.idNumber,
                    visitsIds: this.state.visitsIds,
                }
                console.log(data);
                this.props.putHandler(constants.VISITORS, data);
                this.props.changePanel(constants.VISITORS);
            }else{
                this.setState({error: 'There are no updates for this patient!'})
            }
        }else if( this.state.firstName == '' || this.state.lastName =='' || this.state.supervisorId == '' ){
            this.setState({error: 'Not all required inputs are filled!'})
        }
    }
    
    render(){
        return(
            <div className="form-panel">
                <div className="page-title">
                    <span>Edit visitor</span>
                    <button 
                        className="default-btn back"
                        onClick={()=>this.props.changePanel(constants.VISITORS)}
                    >Back</button>
                </div>
                <div className="form">
                    <div className="item-content">
                        <input 
                            placeholder="First name*"
                            value={this.state.firstName}
                            onChange={(e)=>this.firstNameChangeHandler(e)}></input>
                        <input 
                            placeholder="Last name*"
                            value={this.state.lastName}
                            onChange={(e)=>this.lastNameChangeHandler(e)}></input>
                        <input 
                            placeholder="id number*"
                            value={this.state.idNumber}
                            onChange={(e)=>this.idNumberChangeHandler(e)}></input>
                        <input 
                            placeholder="visits"
                            value={this.state.visits}
                            onChange={(e)=>this.visitsChangeHandler(e)}></input>
                    </div>
                    <div className="item-footer">
                        {this.state.error != null ? <p className="form-error">{this.state.error}</p> : null}
                        <div className="controls">
                            <button className="controls-btn add" onClick={()=>this.submitHandler()}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditVisitor;