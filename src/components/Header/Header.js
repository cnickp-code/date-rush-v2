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
    }

    render() {
        return (
            <nav>
                <div className="left-nav-container" onClick={this.handleHome}>
                    <img src='https://i.ibb.co/PFdwK1D/output-onlinepngtools-2.png' className="logo-img"></img>
                    <div className="logo-text">Date Rush</div>
                </div>
                <div className="right-nav-container">

                </div>
            </nav>
        )
    }
}

export default Header;
