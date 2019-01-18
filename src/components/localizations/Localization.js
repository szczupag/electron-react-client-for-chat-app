import React from 'react';
import constants from '../../constants/pages';

const Localization = props => {
    return(
        <div className="item-wrapper">
            <div className="item-content">
                <p className="label">city:</p>
                <p>{props.data.city}</p>
                <p className="label">postal code:</p>
                <p>{props.data.postalCode}</p>
                <p className="label">street:</p>
                <p>{props.data.street}</p>
                <p className="label">building number:</p>
                <p>{props.data.buildingNo}</p>
                <p className="label">clinic:</p>
                <p>{props.data.clinic!=undefined?props.data.clinic:"No clinic at this location"}</p>
            </div>
            <div className="item-footer">
                <div className="controls">
                    <button 
                        className="controls-btn edit" 
                        onClick={()=>{
                            props.editItemHandler(props.data);
                            props.changePanel(constants.EDIT_LOCALIZATION);
                        }}>Edit</button>
                    <button 
                        className="controls-btn delete" 
                        onClick={()=>props.deleteHandler(constants.LOCALIZATIONS,props.data.id)}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Localization;