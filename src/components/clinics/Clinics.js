import React, {Component} from 'react';
import Clinic from './Clinic';
import constants from '../../constants/pages';

class Clinics extends Component {
    constructor(props){
        super(props)
        this.state = {
            clinics: []
        }
    }

    componentDidMount () {
        this.props.getHandler(constants.CLINICS);
        this.setState({
            clinics: this.props.clinics
        })
    }

    componentWillReceiveProps(newProps){
        this.setState({
            clinics: newProps.clinics,
            localizations: newProps.localizations
        })
    }

    render(){
        return(
            <div className="clinics">
                <div className="page-title">
                    <span>Clinics</span>
                    <button 
                        className="default-btn back"
                        onClick={()=>this.props.changePanel(constants.HOME)}
                    >Back</button>
                </div>
                <div className="options">
                    <button 
                        className="controls-btn add"
                        onClick={()=>this.props.changePanel(constants.NEW_CLINIC)}
                    >Add new clinic</button>
                </div>
                <div className="elements">
                {
                    this.state.clinics.map( (clinic, index) => {
                        return <Clinic 
                            key={index} 
                            data={clinic}
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

export default Clinics;