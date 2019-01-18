import React, {Component} from 'react';
import constants from '../../constants/pages';
import Treatment from './Treatment';

class Treatments extends Component {
    constructor(props){
        super(props)
        this.state = {
            treatments: []
        }
    }

    componentDidMount () {
        this.props.getHandler(constants.TREATMENTS);
        this.setState({
            treatments: this.props.treatments
        })
        console.log(this.state.treatments)
    }

    componentWillReceiveProps(newProps){
        this.setState({
            treatments: newProps.treatments
        })
    }

    render(){
        return(
            <div className="treatment">
                <div className="page-title">
                    <span>Treatments</span>
                    <button 
                        className="default-btn back"
                        onClick={()=>this.props.changePanel(constants.HOME)}
                    >Back</button>
                </div>
                <div className="options">
                    <button 
                        className="controls-btn add"
                        onClick={()=>this.props.changePanel(constants.NEW_TREATMENT)}
                    >Add new treatment</button>
                </div>
                <div className="elements">
                {
                    this.state.treatments.map( (treatment, index) => {
                        return <Treatment
                            key={index} 
                            data={treatment}
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

export default Treatments;