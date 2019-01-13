import React, {Component} from 'react';
import constants from '../../constants/pages';
import Localization from './Localization';

class Localizations extends Component {
    constructor(props){
        super(props)
        this.state = {
            localizations: []
        }
    }

    componentDidMount () {
        this.props.getHandler(constants.LOCALIZATIONS);
        this.setState({
            localizations: this.props.localizations
        })
        console.log(this.state.localizations)
    }

    componentWillReceiveProps(newProps){
        this.setState({
            localizations: newProps.localizations
        })
    }

    render(){
        return(
            <div className="localizations">
                <div className="page-title">
                    <span>Localizations</span>
                    <button 
                        className="default-btn back"
                        onClick={()=>this.props.changePanel(constants.HOME)}
                    >Back</button>
                </div>
                <div className="options">
                    <button 
                        className="controls-btn add"
                        onClick={()=>this.props.changePanel(constants.NEW_LOCALIZATION)}
                    >Add new localizations</button>
                </div>
                <div className="elements">
                {
                    this.state.localizations.map( (localization, index) => {
                        return <Localization
                            key={index} 
                            data={localization}
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

export default Localizations;