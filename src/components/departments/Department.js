import React from 'react';
import constants from '../../constants/pages';

const Department = props => {
    return(
        <div className="item-wrapper">
            <div className="item-content">
                <p className="label">name:</p>
                <p>{props.data.name}</p>
            </div>
            <div className="item-footer">
                <div className="controls">
                    <button 
                        className="controls-btn edit" 
                        onClick={()=>{
                            props.editItemHandler(props.data);
                            props.changePanel(constants.EDIT_DEPARTMENT);
                        }}>Edit</button>
                    <button 
                        className="controls-btn delete" 
                        onClick={()=>props.deleteHandler(constants.DEPARTMENTS,props.data.id)}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Department;