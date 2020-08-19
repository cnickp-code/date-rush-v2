import React from 'react';
import DRContext from '../../context/DRContext';

class Home extends React.Component {
    static contextType = DRContext;

    handleProfile = () => {
        this.context.handleSetStep(6);
    }

    handleNextStep = () => {
        this.context.handleSetStep(1);
        this.context.toggleBuildBool(true);
        this.context.handleSetLocation(null, null);
        this.context.handleSetShowNext(false);
    }

    render() {
        return (
            <div className="home-container">
                <div className="home-header">
                    <h1>Welcome</h1>
                </div>
                <div className="home-body">
                    <h3>Feeling lucky?</h3>
                    <p className="mt-10">Use the Date Generator to generate a full date on the fly through four easy steps!</p>
                    <button className="item-btn2 mt-20 mb-20" onClick={this.handleNextStep}>Get Started!</button>
                    
                    <h3>See your saved dates!</h3>
                    {/* <p className="mt-10">Check out the single category randomizer for something more specific!</p> */}
                    <button className="item-btn2 mt-20 mb-20" onClick={this.handleProfile}>Profile</button>
                </div>
            </div>
        )
    }
}

export default Home;