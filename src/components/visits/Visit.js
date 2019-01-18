import React from 'react';
import constants from '../../constants/pages';

const Visit = props => {
    return(
        <div className="item-wrapper">
            <div className="item-header">
                <p>{props.data.patient.firstName+" "+props.data.patient.lastName}</p>
            </div>
            <div className="item-content">
                <p className="label">visitor:</p>
                <p>{props.data.visitor.firstName+" "+props.data.visitor.lastName}</p>
                <p className="label">visit date:</p>
                <p>{props.data.visitDate}</p>
                <p className="label">end date:</p>
                <p>{props.data.endDate}</p>
            </div>
            <div className="item-footer">
                <div className="controls">
                    <button 
                        className="controls-btn edit" 
                        onClick={()=>{
                            props.editItemHandler(props.data);
                            props.changePanel(constants.EDIT_VISIT);
                        }}>Edit</button>
                    <button 
                        className="controls-btn delete" 
                        onClick={()=>props.deleteHandler(constants.VISITS,props.data.id)}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Visit;