import React, {Component} from 'react';
import constants from '../../constants/pages';
import Select from 'react-select';

class NewLocalization extends Component {
    constructor(props){
        super(props)
        let clinicsMap = this.props.clinics.map((clinic)=>{
            if (clinic.localization===undefined) {
                return { value: clinic, label: clinic.name+" "+clinic.type}
            }
        });
        clinicsMap.filter(function(el){return el != undefined;});
        this.state={
            city: '',
            postalCode: '',
            street: '',
            buildingNo: '',
            clinics: clinicsMap[0]!=undefined?clinicsMap:[],
            clinic: null,
            error: null
        }
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.postalCodeChangeHandler = this.postalCodeChangeHandler.bind(this);
        this.streetChangeHandler = this.streetChangeHandler.bind(this);
        this.buildingNoChangeHandler = this.buildingNoChangeHandler.bind(this);
        this.clinicChangeHandler = this.clinicChangeHandler.bind(this);
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

    buildingNoChangeHandler(e){
        this.setState({buildingNo: e.target.value})
    }

    clinicChangeHandler(selectedClinic){
        this.setState({clinic: selectedClinic});
    }

    submitHandler(){
        const clinicId = this.state.clinic!=null ? this.state.clinic.value.id : null;
        if(Number.isInteger(parseInt(this.state.buildingNo))){
            if( this.state.city != '' && this.state.postalCode!='' && this.state.street!='' ){
                const data = {
                    city: this.state.city,
                    postalCode: this.state.postalCode,
                    street: this.state.street,
                    buildingNo: parseInt(this.state.buildingNo),
                    clinic: clinicId
                }
                console.log(data);
                this.props.postHandler(constants.LOCALIZATIONS, data);
                this.props.changePanel(constants.LOCALIZATIONS);
            }else{
                this.setState({error: 'Not all required inputs are filled!'})
            }
        }else{
            this.setState({error: 'Wrong input type!'})
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
                        <input
                            placeholder="Building number*"
                            value={this.state.buildingNo}
                            onChange={(e)=>this.buildingNoChangeHandler(e)}></input>
                        <Select
                            name="cli-for-loc"
                            placeholder="Clinic*"
                            className="selectBox"
                            value={this.state.clinic}
                            onChange={this.clinicChangeHandler}
                            options={this.state.clinics}
                        />
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