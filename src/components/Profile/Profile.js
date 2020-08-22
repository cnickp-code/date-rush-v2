import React from 'react';
import DRContext from '../../context/DRContext';
import ProfileItem from './ProfileItem';

class Profile extends React.Component {
    static contextType = DRContext;

    render() {
        let profileDates = <h3 className="item-header text-center">No Dates Found</h3>;
        if(this.context.myDates && this.context.myDates.length > 0) {
            profileDates = this.context.myDates.map(date => {
                return <ProfileItem key={date.id} date={date} />
            })
        } 


        return (
            <div className="results-container">
                <h1 className="results-header text-center mb-10">Profile</h1>
                <p className="text-center"><i>Your Dates</i></p>
                <div className="profile-main-container">
                    {profileDates}
                </div>
            </div>
        )
    }
}

export default Profile;