import React, {Component} from 'react';
import constants from '../../constants/pages';

class EditDoctor extends Component {
    constructor(props){
        super(props)
        this.state={
            name: this.props.data.name,
            severity: this.props.data.severity,
            treatmentsIds: [],
            error: null
        }
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.severityChangeHandler = this.severityChangeHandler.bind(this);
        this.treatmentsIdChangeHandler = this.treatmentsIdChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    nameChangeHandler(e){
        this.setState({name: e.target.value})
    }

    severityChangeHandler(e){
        this.setState({severity: e.target.value})
    }

    treatmentsIdChangeHandler(e){
        this.setState({treatmentsId: e.target.value})
    }

    submitHandler(){
        if( this.state.name != '' && this.state.severity!=''){
            if( this.state.name != this.props.data.name || this.state.severity != this.props.data.severity){
                const data = {
                    id: this.props.data.id,
                    name: this.state.name,
                    severity: this.state.severity,
                    treatmentsIds: this.state.treatmentsIds
                }
                console.log(data);
                this.props.putHandler(constants.DISEASES, data);
                this.props.changePanel(constants.DISEASES);
            }else{
                this.setState({error: 'There are no updates for this treatment'})
            }
        }else if( this.state.name == '' || this.state.severity ==''){
            this.setState({error: 'Not all required inputs are filled!'})
        }
    }
    
    render(){
        return(
            <div className="form-panel">
                <div className="page-title">
                    <span>Edit disease</span>
                    <button 
                        className="default-btn back"
                        onClick={()=>this.props.changePanel(constants.DISEASES)}
                    >Back</button>
                </div>
                <div className="form">
                    <div className="item-content">
                        <input 
                            placeholder="Name*"
                            value={this.state.name}
                            onChange={(e)=>this.nameChangeHandler(e)}></input>
                        <input 
                            placeholder="Severity*"
                            value={this.state.severity}
                            onChange={(e)=>this.severityChangeHandler(e)}></input>
                        <input 
                            placeholder="Treatments"
                            value={this.state.treatmentsIds}
                            onChange={(e)=>this.treatmentsIdChangeHandler(e)}></input>
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