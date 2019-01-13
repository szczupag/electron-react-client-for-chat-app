import React, {Component} from 'react';
import constants from '../../constants/pages';

class NewDepartment extends Component {
    constructor(props){
        super(props)
        this.state={
            name: '',
            error: null
        }
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    nameChangeHandler(e){
        this.setState({name: e.target.value})
    }

    submitHandler(){
        if( this.state.name != ''){
            const data = {
                name: this.state.name
            }
            this.props.postHandler(constants.DEPARTMENTS, data);
            this.props.changePanel(constants.DEPARTMENTS);
        }else{
            this.setState({error: 'Not all required inputs are filled!'})
        }
    }
    
    render(){
        return(
            <div className="form-panel">
                <div className="page-title">
                    <span>New department</span>
                    <button 
                        className="default-btn back"
                        onClick={()=>this.props.changePanel(constants.DEPARTMENTS)}
                    >Back</button>
                </div>
                <div className="form">
                    <div className="item-content">
                        <input 
                            placeholder="Name*"
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

export default NewDepartment;