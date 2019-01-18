import React, {Component} from 'react';
import constants from '../../constants/pages';
import Visit from './Visit';

class Visits extends Component {
    constructor(props){
        super(props)
        this.state = {
            visits: []
        }
    }

    componentDidMount () {
        this.props.getHandler(constants.VISITS);
        this.setState({
            visits: this.props.visits
        })
        console.log(this.state.visits)
    }

    componentWillReceiveProps(newProps){
        this.setState({
            visits: newProps.visits
        })
    }

    render(){
        return(
            <div className="visits">
                <div className="page-title">
                    <span>Visits</span>
                    <button 
                        className="default-btn back"
                        onClick={()=>this.props.changePanel(constants.HOME)}
                    >Back</button>
                </div>
                <div className="options">
                    <button 
                        className="controls-btn add"
                        onClick={()=>this.props.changePanel(constants.NEW_VISIT)}
                    >Add new visit</button>
                </div>
                <div className="elements">
                {
                    this.state.visits.map( (visit, index) => {
                        return <Visit
                            key={index} 
                            data={visit}
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

export default Visits;