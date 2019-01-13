import React, {Component} from 'react';
import constants from '../../constants/pages';
import Doctor from './Doctor';

class Doctors extends Component {
    constructor(props){
        super(props)
        this.state = {
            doctors: []
        }
    }

    componentDidMount () {
        this.props.getHandler(constants.DOCTORS);
        this.setState({
            doctors: this.props.doctors
        })
        console.log(this.state.doctors)
    }

    componentWillReceiveProps(newProps){
        this.setState({
            doctors: newProps.doctors
        })
    }

    render(){
        return(
            <div className="doctors">
                <div className="page-title">
                    <span>Doctors</span>
                    <button 
                        className="default-btn back"
                        onClick={()=>this.props.changePanel(constants.HOME)}
                    >Back</button>
                </div>
                <div className="options">
                    <button 
                        className="controls-btn add"
                        onClick={()=>this.props.changePanel(constants.NEW_DOCTOR)}
                    >Add new doctor</button>
                </div>
                <div className="elements">
                {
                    this.state.doctors.map( (doctor, index) => {
                        return <Doctor
                            key={index} 
                            data={doctor}
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

export default Doctors;