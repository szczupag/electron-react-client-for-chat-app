import React, {Component} from 'react';
import constants from '../../constants/pages';

class NewLocalization extends Component {
    constructor(props){
        super(props)
        this.state={
            city: '',
            postalCode: '',
            street: '',
            error: null
        }
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.postalCodeChangeHandler = this.postalCodeChangeHandler.bind(this);
        this.streetChangeHandler = this.streetChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    cityChangeHandler(e){
        this.setState({city: e.target.value})
    }

    postalCodeChangeHandler(e){
        this.setState({postalCode: e.target.value})
    }

    streetChangeHandler(e){
        this.setState({street: e.target.value})
    }

    submitHandler(){
        if( this.state.city != '' && this.state.postalCode!='' && this.state.street!='' ){
            const data = {
                city: this.state.city,
                postalCode: this.state.postalCode,
                street: this.state.street
            }
            console.log(data);
            this.props.postHandler(constants.LOCALIZATIONS, data);
            this.props.changePanel(constants.LOCALIZATIONS);
        }else{
            this.setState({error: 'Not all required inputs are filled!'})
        }
    }
    
    render(){
        return(
            <div className="form-panel">
                <div className="page-title">
                    <span>New localization</span>
                    <button 
                        className="default-btn back"
                        onClick={()=>this.props.changePanel(constants.LOCALIZATIONS)}
                    >Back</button>
                </div>
                <div className="form">
                    <div className="item-content">
                        <input 
                            placeholder="City*"
                            value={this.state.city}
                            onChange={(e)=>this.cityChangeHandler(e)}></input>
                        <input 
                            placeholder="Postal code*"
                            value={this.state.postalCode}
                            onChange={(e)=>this.postalCodeChangeHandler(e)}></input>
                        <input 
                            placeholder="Street*"
                            value={this.state.street}
                            onChange={(e)=>this.streetChangeHandler(e)}></input>
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

export default NewLocalization;