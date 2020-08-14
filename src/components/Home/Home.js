import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div className="home-container">
                <div className="home-header">
                    <h1>Welcome</h1>
                </div>
                <div className="home-body">
                    <h3>Feeling lucky?</h3>
                    <p className="mt-10">Use the Date Generator to generate a full date on the fly through four easy steps!</p>
                    <button className="item-btn2 mt-20 mb-20">Get Started!</button>
                    
                    <h3>Need a little more control?</h3>
                    <p className="mt-10">Check out the single category randomizer for something more specific!</p>
                    <button className="item-btn2 mt-20 mb-20">Browse</button>
                </div>
            </div>
        )
    }
}

export default Home;