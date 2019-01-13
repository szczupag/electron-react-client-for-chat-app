import React, {Component} from 'react';
import constants from '../../constants/pages';

class EditClinic extends Component {
    constructor(props){
        super(props)
        this.state={
            name: this.props.data.name,
            type: this.props.data.type,
            departments: this.props.departments,
            error: null
        }
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    nameChangeHandler(e){
        this.setState({name: e.target.value})
    }

    typeChangeHandler(e){
        this.setState({type: e.target.value})
    }

    submitHandler(){
        if( this.state.name != '' && this.state.type!=''){
            if( this.state.name != this.props.data.name || this.state.type != this.props.data.type){
                const data = {
                    id: this.props.data.id,
                    name: this.state.name,
                    type: this.state.type
                }
                this.props.putHandler(constants.CLINICS, data);
                this.props.changePanel(constants.CLINICS);
            }else{
                this.setState({error: 'There are no updates for this clinic!'})
            }
        }else if(this.state.name == '' || this.state.type ==''){
            this.setState({error: 'Not all required inputs are filled!'})
        }
    }
    
    render(){
        return(
            <div className="form-panel">
                <div className="page-title">
                    <span>Edit clinic</span>
                    <button 
                        className="default-btn back"
                        onClick={()=>this.props.changePanel(constants.CLINICS)}
                    >Back</button>
                </div>
                <div className="form">
                    <div className="item-content">
                        <input 
                            placeholder="Name*"
                            value={this.state.name}
                            onChange={(e)=>this.nameChangeHandler(e)}></input>
                        <input 
                            placeholder="Type*"
                            value={this.state.type}
                            onChange={(e)=>this.typeChangeHandler(e)}></input>
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

export default EditClinic;