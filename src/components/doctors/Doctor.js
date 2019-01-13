import React from 'react';
import constants from '../../constants/pages';

const Doctor = props => {
    return(
        <div className="item-wrapper">
            <div className="item-content">
                <p className="label">first name:</p>
                <p>{props.data.firstName}</p>
                <p className="label">last name:</p>
                <p>{props.data.lastName}</p>
                <p className="label">pesel:</p>
                <p>{props.data.pesel}</p>
                <p className="label">salary:</p>
                <p>{props.data.salary}</p>
                <p className="label">speciality:</p>
                <p>{props.data.speciality}</p>
                <p className="label">supervisor id:</p>
                <p>{props.data.supervisorId}</p>
            </div>
            <div className="item-footer">
                <div className="controls">
                    <button 
                        className="controls-btn edit" 
                        onClick={()=>{
                            props.editItemHandler(props.data);
                            props.changePanel(constants.EDIT_DOCTOR);
                        }}>Edit</button>
                    <button 
                        className="controls-btn delete" 
                        onClick={()=>props.deleteHandler(constants.DOCTORS,props.data.pesel)}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Doctor;