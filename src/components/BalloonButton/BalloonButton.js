import React from 'react';

class BalloonButton extends React.Component {
    render() {
        return (
            <div className="bb-container">
                <div className="bb-arrow text-center">
                    <i class="fas fa-caret-up"></i>
                </div>
                <img src="https://i.ibb.co/PFdwK1D/output-onlinepngtools-2.png" className="bb-img"></img>
                <div className="bb-arrow text-center">
                    <i class="fas fa-caret-down"></i>
                </div>
            </div>
        )
    }
}

export default BalloonButton;