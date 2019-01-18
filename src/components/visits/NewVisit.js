import React, {Component} from 'react';
import constants from '../../constants/pages';

class NewVisit extends Component {
    constructor(props){
        super(props)
        this.state={
            patientPesel: '',
            visitorId: '',
            visitDate: '',
            error: null
        }
        this.patientChangeHandler = this.patientChangeHandler.bind(this);
        this.visitDateChangeHandler = this.visitDateChangeHandler.bind(this);
        this.visitorIdChangeHandler = this.visitorIdChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    patientChangeHandler(e){
        this.setState({patientPesel: e.target.value})
    }

    visitDateChangeHandler(e){
        this.setState({visitDate: e.target.value})
    }

    visitorIdChangeHandler(e){
        this.setState({visitorId: e.target.value})
    }

    submitHandler(){
        if(this.state.visitDate != '' && this.state.patientPesel!='', this.state.visitorId!=''){
            const data = {
                patientPesel: this.state.patientPesel,
                visitDate: this.state.visitDate,
                visitorId: this.state.visitorId
            }
            console.log(data);
            this.props.postHandler(constants.VISITS, data);
            this.props.changePanel(constants.VISITS);
        }else{
            this.setState({error: 'Not all required inputs are filled!'})
        }
    }
    // 
    render(){
        return(
            <div className="form-panel">
                <div className="page-title">
                    <span>New treatment</span>
                    <button 
                        className="default-btn back"
                        onClick={()=>this.props.changePanel(constants.VISITS)}
                    >Back</button>
                </div>
                <div className="form">
                    <div className="item-content">
                        <input 
                            placeholder="Patient pesel*"
                            value={this.state.patientPesel}
                            onChange={(e)=>this.patientChangeHandler(e)}></input>
                        <input 
                            placeholder="Visit date*"
                            value={this.state.visitDate}
                            onChange={(e)=>this.visitDateChangeHandler(e)}></input>
                        <input 
                            placeholder="Visitor pesel*"
                            value={this.state.visitorId}
                            onChange={(e)=>this.visitorIdChangeHandler(e)}></input>
                    </div>
                    <div className="item-footer">
                        {this.state.error != null ? <p className="form-error">{this.state.error}</p> : null}
                        <div className="controls">
                            <button className="controls-btn add" onClick={()=>this.submitHandler()}>Add</button>
                        </div>,
                    </div>
                </div>
            </div>
        );
    }
}

export default NewVisit;