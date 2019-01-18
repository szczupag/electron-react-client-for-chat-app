import React, {Component} from 'react';
import constants from '../../constants/pages';

class NewVisitor extends Component {
    constructor(props){
        super(props)
        this.state={
            firstName: '',
            lastName: '',
            pesel: '',
            idNumber: '',
            visits: [],
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
        if( this.state.firstName != '' && this.state.lastName!='' && this.state.pesel!=''){
            const data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                pesel: this.state.pesel,
                idNumber: this.state.idNumber,
                visits: this.state.visits,
            }
            console.log(data);
            this.props.postHandler(constants.VISITORS, data);
            this.props.changePanel(constants.VISITORS);
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
                            placeholder="Pesel*"
                            value={this.state.pesel}
                            onChange={(e)=>this.peselChangeHandler(e)}></input>
                        <input 
                            placeholder="id number"
                            value={this.state.idNumber}
                            onChange={(e)=>this.idNumberChangeHandler(e)}></input>
                        <input 
                            placeholder="Visits"
                            value={this.state.visits}
                            onChange={(e)=>this.visitsChangeHandler(e)}></input>
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

export default NewVisitor;