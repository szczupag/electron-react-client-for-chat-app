import React from 'react';
import constants from '../../constants/pages';

const MedicalProcedure = props => {
    return(
        <div className="item-wrapper">
            <div className="item-content">
                <p className="label">cost:</p>
                <p>{props.data.cost}</p>
                <p className="label">name:</p>
                <p>{props.data.name}</p>
                <p className="label">doctors:</p>
                {/* <p>{props.data.treatments}</p> */}
            </div>
            <div className="item-footer">
                <div className="controls">
                    <button 
                        className="controls-btn edit" 
                        onClick={()=>{
                            props.editItemHandler(props.data);
                            props.changePanel(constants.EDIT_MEDICAL_PROCEDURE);
                        }}>Edit</button>
                    <button 
                        className="controls-btn delete" 
                        onClick={()=>props.deleteHandler(constants.MEDICAL_PROCEDURES,props.data.id)}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default MedicalProcedure;