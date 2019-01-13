import React from 'react';
import constants from '../../constants/pages';

const Clinic = props => {
    return(
        <div className="item-wrapper">
            <div className="item-header">
                <p>{props.data.name}</p>
            </div>
            <div className="item-content">
                <p className="label">type:</p>
                <p>{props.data.type}</p>
                <p className="label">departments:</p>
                {
                    Object.keys(props.data.departments).length!=0 ?           
                        <span>{props.data.departments.map((department)=>{
                            return department.name
                        })}</span> : <span className="empty">No departments in this clinic</span>
                }
                <p className="label">localization:</p>                
                <p>{props.data.localization}</p>
                
            </div>
            <div className="item-footer">
                <div className="controls">
                    <button 
                        className="controls-btn edit" 
                        onClick={()=>{
                            props.editItemHandler(props.data);
                            props.changePanel(constants.EDIT_CLINIC);
                        }}>Edit</button>
                    <button 
                        className="controls-btn delete" 
                        onClick={()=>props.deleteHandler(constants.CLINICS,props.data.id)}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Clinic;