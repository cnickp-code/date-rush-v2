import React from 'react';
import DRContext from '../../context/DRContext';
import ProfileItem from './ProfileItem';

class Profile extends React.Component {
    static contextType = DRContext;

    render() {
        return (
            <div className="results-container">
                <h1 className="results-header text-center mb-10">Profile</h1>
                <p className="text-center"><i>Your Dates</i></p>
                <div className="profile-main-container">
                    <ProfileItem />
                    <ProfileItem />
                    <ProfileItem />
                    <ProfileItem />
                    <ProfileItem />
                    <ProfileItem />
                    <ProfileItem />
                    <ProfileItem />
                    <ProfileItem />
                    <ProfileItem />
                    <ProfileItem />
                    <ProfileItem />
                    <ProfileItem />
                    <ProfileItem />
                    <ProfileItem />
                    <ProfileItem />
                </div>
            </div>
        )
    }
}

export default Profile;