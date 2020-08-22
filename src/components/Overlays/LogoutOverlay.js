import React from 'react';
import DRContext from '../../context/DRContext';
import TokenService from '../../services/token-service';

class LogoutOverlay extends React.Component {
    static contextType = DRContext;

    handleLogoutClick = () => {
        TokenService.clearAuthToken();
        document.body.classList.remove('body-pos-results');
        document.body.classList.remove('body-pos-profile');
        document.body.classList.remove('body-pos-step4');
        document.body.classList.remove('body-pos-step3');
        document.body.classList.remove('body-pos-step2');
        document.body.classList.remove('body-pos-home');
        document.body.classList.add('body-pos-landing');
        document.documentElement.style.overflow = 'scroll';
        document.body.scroll = 'yes';
        this.context.toggleLogoutBool();
    }

    closeOverlay = () => {
        this.context.toggleLogoutBool();
        document.documentElement.style.overflow = 'scroll';
        document.body.scroll = 'yes';
    }

    render() {
        return (
            <div className="overlay-container">
                <div className="logout-modal">
                    <h1 className="step-header text-center">Are you sure?</h1>
                    <div className="logout-buttons">
                        <button className="item-btn2" onClick={this.handleLogoutClick}>Yes</button>
                        <button className="item-btn2" onClick={this.closeOverlay}>No</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LogoutOverlay;