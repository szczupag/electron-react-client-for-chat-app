import React, {Component} from 'react';
import constants from '../../constants/pages';
import Department from './Department';

class Departments extends Component {
    constructor(props){
        super(props)
        this.state = {
            departments: []
        }
    }

    componentDidMount () {
        this.props.getHandler(constants.DEPARTMENTS);
        this.setState({
            departments: this.props.departments
        })
    }

    componentWillReceiveProps(newProps){
        this.setState({
            departments: newProps.departments
        })
    }

    render(){
        return(
            <div className="departments">
                <div className="page-title">
                    <span>Departments</span>
                    <button 
                        className="default-btn back"
                        onClick={()=>this.props.changePanel(constants.HOME)}
                    >Back</button>
                </div>
                <div className="options">
                    <button 
                        className="controls-btn add"
                        onClick={()=>this.props.changePanel(constants.NEW_DEPARTMENT)}
                    >Add new department</button>
                </div>
                <div className="elements">
                {
                    this.state.departments.map( (department, index) => {
                        return <Department
                            key={index} 
                            data={department}
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

export default Departments;