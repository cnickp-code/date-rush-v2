import React from 'react';
import DRContext from '../../context/DRContext';

class ProfileItem extends React.Component {
    static contextType = DRContext;

    

    render() {
        return (
            <div className="pi-container">
                <h3 className="pi-title">Temporary</h3>
                <div className="pi-delete">
                    <i className="fs-xl fas fa-trash-alt trash"></i>
                </div>
            </div>
        )
    }
}

export default ProfileItem;