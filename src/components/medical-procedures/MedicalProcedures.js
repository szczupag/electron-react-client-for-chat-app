import React, {Component} from 'react';
import constants from '../../constants/pages';
import MedicalProcedure from './MedicalProcedure';

class MedicalProcedures extends Component {
    constructor(props){
        super(props)
        this.state = {
            medicalProcedures: []
        }
    }

    componentDidMount () {
        this.props.getHandler(constants.MEDICAL_PROCEDURES);
        this.setState({
            medicalProcedures: this.props.medicalProcedures
        })
        console.log(this.state.medicalProcedure)
    }

    componentWillReceiveProps(newProps){
        this.setState({
            medicalProcedures: newProps.medicalProcedures
        })
    }

    render(){
        return(
            <div className="medical-procedure">
                <div className="page-title">
                    <span>Medical procedures</span>
                    <button 
                        className="default-btn back"
                        onClick={()=>this.props.changePanel(constants.HOME)}
                    >Back</button>
                </div>
                <div className="options">
                    <button 
                        className="controls-btn add"
                        onClick={()=>this.props.changePanel(constants.NEW_MEDICAL_PROCEDURE)}
                    >Add new medical procedure</button>
                </div>
                <div className="elements">
                {
                    this.state.medicalProcedures.map( (procedure, index) => {
                        return <MedicalProcedure
                            key={index} 
                            data={procedure}
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

export default MedicalProcedures;