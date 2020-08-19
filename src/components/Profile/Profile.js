import React from 'react';
import DRContext from '../../context/DRContext';
import ProfileItem from './ProfileItem';

class Profile extends React.Component {
    static contextType = DRContext;

    render() {
        let profileDates;
        if(this.context.myDates) {
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