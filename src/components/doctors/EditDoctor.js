import React, {Component} from 'react';
import constants from '../../constants/pages';

class EditDoctor extends Component {
    constructor(props){
        super(props)
        this.state={
            firstName: this.props.data.firstName,
            lastName: this.props.data.lastName,
            supervisorId: this.props.data.supervisorId,
            salary: this.props.data.salary!=undefined ? this.props.data.salary : '',
            speciality: this.props.data.speciality!=undefined ? this.props.data.speciality : '',
            error: null
        }
        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
        this.supervisorIdChangeHandler = this.supervisorIdChangeHandler.bind(this);
        this.salaryChangeHandler = this.salaryChangeHandler.bind(this);
        this.specialityChangeHandler = this.specialityChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    firstNameChangeHandler(e){
        this.setState({firstName: e.target.value})
    }

    lastNameChangeHandler(e){
        this.setState({lastName: e.target.value})
    }

    supervisorIdChangeHandler(e){
        this.setState({supervisorId: e.target.value})
    }

    salaryChangeHandler(e){
        this.setState({salary: e.target.value});
    }

    specialityChangeHandler(e){
        this.setState({speciality: e.target.value});
    }

    submitHandler(){
        if( this.state.firstName != '' && this.state.lastName!='' && this.state.supervisorId!='' ){
            if( this.state.firstName != this.props.data.firstName || this.state.lastName != this.props.data.lastName || this.state.supervisorId != this.props.data.supervisorId || this.state.salary != this.props.data.salary){
                const data = {
                    pesel: this.props.data.pesel,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    supervisorId: this.state.supervisorId,
                    salary: this.state.salary,
                    speciality: this.state.speciality
                }
                console.log(data);
                this.props.putHandler(constants.DOCTORS, data);
                this.props.changePanel(constants.DOCTORS);
            }else{
                this.setState({error: 'There are no updates for this doctor!'})
            }
        }else if( this.state.firstName == '' || this.state.lastName =='' || this.state.supervisorId == '' ){
            this.setState({error: 'Not all required inputs are filled!'})
        }
    }
    
    render(){
        return(
            <div className="form-panel">
                <div className="page-title">
                    <span>Edit doctor</span>
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
                            placeholder="Supervisor Id"
                            value={this.state.supervisorId}
                            onChange={(e)=>this.supervisorIdChangeHandler(e)}></input>
                        <input 
                            placeholder="Salary"
                            value={this.state.salary}
                            onChange={(e)=>this.salaryChangeHandler(e)}></input>
                        <input 
                            placeholder="Speciality"
                            value={this.state.speciality}
                            onChange={(e)=>this.specialityChangeHandler(e)}></input>
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

export default EditDoctor;