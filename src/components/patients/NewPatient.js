import React, {Component} from 'react';
import constants from '../../constants/pages';

class NewPatient extends Component {
    constructor(props){
        super(props)
        this.state={
            firstName: '',
            lastName: '',
            pesel: '',
            phoneNumber: '',
            treatments: [],
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
        if( this.state.firstName != '' && this.state.lastName!='' && this.state.pesel!=''){
            const data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                pesel: this.state.pesel,
                phoneNumber: this.state.phoneNumber,
                treatments: this.state.treatments,
            }
            console.log(data);
            this.props.postHandler(constants.PATEINTS, data);
            this.props.changePanel(constants.PATEINTS);
        }else{
            this.setState({error: 'Not all required inputs are filled!'})
        }
    }
    
    render(){
        return(
            <div className="form-panel">
                <div className="page-title">
                    <span>New patient</span>
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
                            placeholder="Pesel*"
                            value={this.state.pesel}
                            onChange={(e)=>this.peselChangeHandler(e)}></input>
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
                            <button className="controls-btn add" onClick={()=>this.submitHandler()}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewPatient;