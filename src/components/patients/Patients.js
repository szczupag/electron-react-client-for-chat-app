import React, {Component} from 'react';
import constants from '../../constants/pages';
import Patient from './Patient';

class Patients extends Component {
    constructor(props){
        super(props)
        this.state = {
            patients: []
        }
    }

    componentDidMount () {
        this.props.getHandler(constants.PATEINTS);
        this.setState({
            patients: this.props.patients
        })
        console.log(this.state.patients)
    }

    componentWillReceiveProps(newProps){
        this.setState({
            patients: newProps.patients
        })
    }

    render(){
        return(
            <div className="patients">
                <div className="page-title">
                    <span>Patients</span>
                    <button 
                        className="default-btn back"
                        onClick={()=>this.props.changePanel(constants.HOME)}
                    >Back</button>
                </div>
                <div className="options">
                    <button 
                        className="controls-btn add"
                        onClick={()=>this.props.changePanel(constants.NEW_PATIENT)}
                    >Add new patient</button>
                </div>
                <div className="elements">
                {
                    this.state.patients.map( (patient, index) => {
                        return <Patient
                            key={index} 
                            data={patient}
                            deleteHandler={this.props.deleteHandler}
                            editItemHandler={this.props.editItemHandler}
                            changePanel={this.props.changePanel}
                            />
                    })
                }
                </div>
            </div>
        )
    }
}

export default Patients;