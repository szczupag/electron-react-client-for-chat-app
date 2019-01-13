import React, { Component } from 'react';
import constants from '../constants/pages';

class Home extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="home">
                <div className="page-title">
                    <span>Home</span>
                </div>
                <div className="options">
                    <span className="subtitle">Choose panel</span>
                    <button className="default-btn" onClick={()=>this.props.changePanel(constants.CLINICS)}>Clinics</button>
                    <button className="default-btn" onClick={()=>this.props.changePanel(constants.DEPARTMENTS)}>Departments</button>
                    <button className="default-btn" onClick={()=>this.props.changePanel(constants.LOCALIZATIONS)}>Localizations</button>
                    <button className="default-btn" onClick={()=>this.props.changePanel(constants.DOCTORS)}>Doctors</button>
                    <button className="default-btn" onClick={()=>this.props.changePanel(constants.DISEASES)}>Diseases</button>
                    <button className="default-btn" onClick={()=>this.props.changePanel(constants.MEDICAL_PROCEDURES)}>Medical procedures</button>
                    <button className="default-btn" onClick={()=>this.props.changePanel(constants.PATEINTS)}>Patients</button>
                    <button className="default-btn" onClick={()=>this.props.changePanel(constants.TREATMENTS)}>Treatments</button>
                    <button className="default-btn" onClick={()=>this.props.changePanel(constants.VISITS)}>Visits</button>
                    <button className="default-btn" onClick={()=>this.props.changePanel(constants.VISITORS)}>Visitors</button>
                </div>
            </div>
        )
    }
}

export default Home;