import React from 'react';
import constants from '../../constants/pages';

const Patient = props => {
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
                <p className="label">treatments:</p>
                <p>{props.data.treatments}</p>
            </div>
            <div className="item-footer">
                <div className="controls">
                    <button 
                        className="controls-btn edit" 
                        onClick={()=>{
                            props.editItemHandler(props.data);
                            props.changePanel(constants.EDIT_PATIENT);
                        }}>Edit</button>
                    <button 
                        className="controls-btn delete" 
                        onClick={()=>props.deleteHandler(constants.PATEINTS,props.data.pesel)}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Patient;