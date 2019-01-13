import React, {Component} from 'react';
import constants from '../../constants/pages';

class EditDepartment extends Component {
    constructor(props){
        super(props)
        this.state={
            name: this.props.data.name,
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
            if( this.state.name != this.props.data.name || this.state.type != this.props.data.type){
                const data = {
                    id: this.props.data.id,
                    name: this.state.name
                }
                this.props.putHandler(constants.DEPARTMENTS, data);
                this.props.changePanel(constants.DEPARTMENTS);
            }else{
                this.setState({error: 'There are no updates for this department!'})
            }
        }else if(this.state.name == ''){
            this.setState({error: 'Not all required inputs are filled!'})
        }
    }
    
    render(){
        return(
            <div className="form-panel">
                <div className="page-title">
                    <span>Edit department</span>
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
                            <button className="controls-btn add" onClick={()=>this.submitHandler()}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditDepartment;