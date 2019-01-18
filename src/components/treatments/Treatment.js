import React from 'react';
import constants from '../../constants/pages';

const Treatment = props => {
    return(
        <div className="item-wrapper">
            <div className="item-content">
                <p className="label">patient:</p>
                <p>{props.data.patientPesel}</p>
                <p className="label">disease:</p>
                <p>{props.data.diseaseId}</p>
                <p className="label">start date:</p>
                <p>{props.data.startDate}</p>
                <p className="label">end date:</p>
                <p>{props.data.endDate}</p>
                <p className="label">medical procedures:</p>
                <p>{props.data.medicalProceduresIds}</p>
            </div>
            <div className="item-footer">
                <div className="controls">
                    <button 
                        className="controls-btn edit" 
                        onClick={()=>{
                            props.editItemHandler(props.data);
                            props.changePanel(constants.EDIT_TREATMENT);
                        }}>Edit</button>
                    <button 
                        className="controls-btn delete" 
                        onClick={()=>props.deleteHandler(constants.TREATMENTS,props.data.id)}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Treatment;