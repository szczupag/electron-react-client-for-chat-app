import React from 'react';
import constants from '../../constants/pages';

const Disease = props => {
    return(
        <div className="item-wrapper">
            <div className="item-content">
                <p className="label">name:</p>
                <p>{props.data.name}</p>
                <p className="label">severity:</p>
                <p>{props.data.severity}</p>
                <p className="label">treatments:</p>
                {/* <p>{props.data.treatments}</p> */}
            </div>
            <div className="item-footer">
                <div className="controls">
                    <button 
                        className="controls-btn edit" 
                        onClick={()=>{
                            props.editItemHandler(props.data);
                            props.changePanel(constants.EDIT_DISEASE);
                        }}>Edit</button>
                    <button 
                        className="controls-btn delete" 
                        onClick={()=>props.deleteHandler(constants.DISEASES,props.data.id)}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Disease;