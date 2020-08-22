import React from 'react';
import DRContext from '../../context/DRContext';

class Header extends React.Component {
    static contextType = DRContext;

    handleHome = () => {
        document.body.classList.remove('body-pos-results');
        document.body.classList.remove('body-pos-step4');
        document.body.classList.remove('body-pos-step3');
        document.body.classList.remove('body-pos-step2');
        document.body.classList.remove('body-pos-step1');
        document.body.classList.add('body-pos-home');
        this.context.handleSetStep(0);
        this.context.toggleBuildBool(false);
        this.context.handleSetLocation(null, null);
        this.context.handleSetSummaryBool(false);
        this.context.handleReset();
    }

    handleProfile = () => {
        document.body.classList.remove('body-pos-results');
        document.body.classList.remove('body-pos-home');
        document.body.classList.remove('body-pos-step4');
        document.body.classList.remove('body-pos-step3');
        document.body.classList.remove('body-pos-step2');
        document.body.classList.add('body-pos-profile');
        this.context.handleSetStep(6);
        this.context.toggleBuildBool(false);
        this.context.handleSetLocation(null, null);
        this.context.handleSetSummaryBool(false);
        this.context.handleReset();
    }

    handleLogout = () => {
        this.context.toggleLogoutBool(true);
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = 'no';
    }

    render() {
        return (
            <nav>
                <div className="left-nav-container" onClick={this.handleHome}>
                    <img src='https://i.ibb.co/PFdwK1D/output-onlinepngtools-2.png' className="logo-img"></img>
                    <div className="logo-text">Date Rush</div>
                </div>
                <div className="right-nav-container">
                    <div className="nav-link" onClick={this.handleHome}><i class="fas fa-home"></i></div>
                    <div className="nav-link2" onClick={this.handleProfile}><i class="fas fa-user-circle"></i></div>
                    <div className="nav-link3" onClick={this.handleLogout}><i class="fas fa-sign-out-alt"></i></div>
                </div>
            </nav>
        )
    }
}

export default Header;
