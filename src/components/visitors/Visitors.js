import React, {Component} from 'react';
import constants from '../../constants/pages';
import Visitor from './Visitor';

class Visitors extends Component {
    constructor(props){
        super(props)
        this.state = {
            visitors: []
        }
    }

    componentDidMount () {
        this.props.getHandler(constants.VISITORS);
        this.setState({
            visitors: this.props.visitors
        })
        console.log(this.state.visitors)
    }

    componentWillReceiveProps(newProps){
        this.setState({
            visitors: newProps.visitors
        })
    }

    render(){
        return(
            <div className="visitors">
                <div className="page-title">
                    <span>visitors</span>
                    <button 
                        className="default-btn back"
                        onClick={()=>this.props.changePanel(constants.HOME)}
                    >Back</button>
                </div>
                <div className="options">
                    <button 
                        className="controls-btn add"
                        onClick={()=>this.props.changePanel(constants.NEW_VISITOR)}
                    >Add new visitor</button>
                </div>
                <div className="elements">
                {
                    this.state.visitors.map( (visitor, index) => {
                        return <Visitor
                            key={index} 
                            data={visitor}
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

export default Visitors;