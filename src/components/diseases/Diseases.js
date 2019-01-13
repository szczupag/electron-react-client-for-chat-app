import React, {Component} from 'react';
import constants from '../../constants/pages';
import Disease from './Disease';

class Diseases extends Component {
    constructor(props){
        super(props)
        this.state = {
            diseases: []
        }
    }

    componentDidMount () {
        this.props.getHandler(constants.DISEASES);
        this.setState({
            diseases: this.props.diseases
        })
        console.log(this.state.diseases)
    }

    componentWillReceiveProps(newProps){
        this.setState({
            diseases: newProps.diseases
        })
    }

    render(){
        return(
            <div className="diseases">
                <div className="page-title">
                    <span>Diseases</span>
                    <button 
                        className="default-btn back"
                        onClick={()=>this.props.changePanel(constants.HOME)}
                    >Back</button>
                </div>
                <div className="options">
                    <button 
                        className="controls-btn add"
                        onClick={()=>this.props.changePanel(constants.NEW_DISEASE)}
                    >Add new disease</button>
                </div>
                <div className="elements">
                {
                    this.state.diseases.map( (disease, index) => {
                        return <Disease
                            key={index} 
                            data={disease}
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

export default Diseases;