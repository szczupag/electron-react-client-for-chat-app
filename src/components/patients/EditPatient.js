import React, {Component} from 'react';
import constants from '../../constants/pages';

class EditPatient extends Component {
    constructor(props){
        super(props)
        this.state={
            firstName: this.props.data.firstName,
            lastName: this.props.data.lastName,
            phoneNumber: this.props.data.phoneNumber,
            treatments: this.props.data.treatments,
            error: null
        }
        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
        this.peselChangeHandler = this.peselChangeHandler.bind(this);
        this.phoneNumberChangeHandler = this.phoneNumberChangeHandler.bind(this);
        this.treatmentsChangeHandler = this.treatmentsChangeHandler.bind(this);
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

    phoneNumberChangeHandler(e){
        this.setState({phoneNumber: e.target.value});
    }

    treatmentsChangeHandler(e){
        this.setState({treatments: e.target.value});
    }

    submitHandler(){
        if( this.state.firstName != '' && this.state.lastName!='' ){
            if( this.state.firstName != this.props.data.firstName || this.state.lastName != this.props.data.lastName ){
                const data = {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    pesel: this.props.data.pesel,
                    phoneNumber: this.state.phoneNumber,
                    treatments: this.state.treatments,
                }
                console.log(data);
                this.props.putHandler(constants.PATEINTS, data);
                this.props.changePanel(constants.PATEINTS);
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
                    <span>Edit patient</span>
                    <button 
                        className="default-btn back"
                        onClick={()=>this.props.changePanel(constants.PATEINTS)}
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
                            placeholder="phoneNumber"
                            value={this.state.phoneNumber}
                            onChange={(e)=>this.phoneNumberChangeHandler(e)}></input>
                        <input 
                            placeholder="treatments"
                            value={this.state.treatments}
                            onChange={(e)=>this.treatmentsChangeHandler(e)}></input>
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

export default EditPatient;