import React, {Component} from 'react';
import constants from '../../constants/pages';

class NewMedicalProcedure extends Component {
    constructor(props){
        super(props)
        this.state={
            cost: '',
            doctors: [],
            name: '',
            error: null
        }
        this.costChangeHandler = this.costChangeHandler.bind(this);
        this.doctorsChangeHandler = this.doctorsChangeHandler.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    costChangeHandler(e){
        this.setState({cost: e.target.value})
    }

    doctorsChangeHandler(e){
        this.setState({doctors: e.target.value})
    }

    nameChangeHandler(e){
        this.setState({name: e.target.value})
    }

    submitHandler(){
        if( this.state.cost != '' && this.state.name!=''){
            const data = {
                cost: this.state.cost,
                doctors: this.state.doctors,
                name: this.state.name
            }
            console.log(data);
            this.props.postHandler(constants.MEDICAL_PROCEDURES, data);
            this.props.changePanel(constants.MEDICAL_PROCEDURES);
        }else{
            this.setState({error: 'Not all required inputs are filled!'})
        }
    }
    
    render(){
        return(
            <div className="form-panel">
                <div className="page-title">
                    <span>New disease</span>
                    <button 
                        className="default-btn back"
                        onClick={()=>this.props.changePanel(constants.MEDICAL_PROCEDURES)}
                    >Back</button>
                </div>
                <div className="form">
                    <div className="item-content">
                        <input 
                            placeholder="Cost*"
                            value={this.state.cost}
                            onChange={(e)=>this.costChangeHandler(e)}></input>
                        <input 
                            placeholder="Doctors"
                            value={this.state.doctors}
                            onChange={(e)=>this.doctorsChangeHandler(e)}></input>
                        <input 
                            placeholder="Treatments*"
                            value={this.state.name}
                            onChange={(e)=>this.nameChangeHandler(e)}></input>
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

export default NewMedicalProcedure;