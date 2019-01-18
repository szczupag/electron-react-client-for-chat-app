import React from 'react';
import constants from '../../constants/pages';

const Visitor = props => {
    return(
        <div className="item-wrapper">
            <div className="item-header">
                <p>{props.data.firstName+" "+props.data.lastName}</p>
            </div>
            <div className="item-content">
                <p className="label">pesel:</p>
                <p>{props.data.pesel}</p>
                <p className="label">phoneNumber:</p>
                <p>{props.data.phoneNumber}</p>
                <p className="label">id number:</p>
                <p>{props.data.idNumber}</p>
                <p className="label">visits:</p>
                <p>{props.data.visits}</p>
            </div>
            <div className="item-footer">
                <div className="controls">
                    <button 
                        className="controls-btn edit" 
                        onClick={()=>{
                            props.editItemHandler(props.data);
                            props.changePanel(constants.EDIT_VISITOR);
                        }}>Edit</button>
                    <button 
                        className="controls-btn delete" 
                        onClick={()=>props.deleteHandler(constants.VISITORS,props.data.pesel)}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Visitor;