import React, {Component} from 'react';
import constants from '../../constants/pages';

class NewDoctor extends Component {
    constructor(props){
        super(props)
        this.state={
            firstName: '',
            lastName: '',
            pesel: '',
            salary: '',
            speciality: '',
            error: null
        }
        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
        this.peselChangeHandler = this.peselChangeHandler.bind(this);
        this.salaryChangeHandler = this.salaryChangeHandler.bind(this);
        this.specialityChangeHandler = this.specialityChangeHandler.bind(this);
        this.supervisorIdChangeHandler = this.supervisorIdChangeHandler.bind(this);
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

    salaryChangeHandler(e){
        this.setState({salary: e.target.value});
    }

    specialityChangeHandler(e){
        this.setState({speciality: e.target.value});
    }

    supervisorIdChangeHandler(e){
        this.setState({supervisorId: e.target.value})
    }

    submitHandler(){
        if( this.state.firstName != '' && this.state.lastName!='' && this.state.pesel!=''){
            const data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                pesel: this.state.pesel,
                salary: this.state.salary,
                speciality: this.state.speciality,
                supervisorId: this.state.supervisorId
            }
            console.log(data);
            this.props.postHandler(constants.DOCTORS, data);
            this.props.changePanel(constants.DOCTORS);
        }else{
            this.setState({error: 'Not all required inputs are filled!'})
        }
    }
    
    render(){
        return(
            <div className="form-panel">
                <div className="page-title">
                    <span>New doctor</span>
                    <button 
                        className="default-btn back"
                        onClick={()=>this.props.changePanel(constants.DOCTORS)}
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
                            placeholder="Salary"
                            value={this.state.salary}
                            onChange={(e)=>this.salaryChangeHandler(e)}></input>
                        <input 
                            placeholder="Speciality"
                            value={this.state.speciality}
                            onChange={(e)=>this.specialityChangeHandler(e)}></input>
                        <input 
                            placeholder="Supervisor ID"
                            value={this.state.supervisorId}
                            onChange={(e)=>this.supervisorIdChangeHandler(e)}></input>
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

export default NewDoctor;