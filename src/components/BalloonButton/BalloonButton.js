import React from 'react';
import DRContext from '../../context/DRContext';

class BalloonButton extends React.Component {
    static contextType = DRContext;

    handleNextStep = () => {
        let step = this.context.step + 1;

        this.context.handleSetStep(step);
        this.context.handleSetShowNext(false);
    }

    handlePrevStep = () => {
        let step = this.context.step - 1;

        this.context.handleSetStep(step);
    }


    render() {
        let currentStep = this.context.step;
        return (
            <div className="bb-container">
                <div className={(this.context.showNext ? 'bb-arrow text-center' : 'bb-arrow text-center hidden')} onClick={this.handleNextStep}>
                    <i class="fas fa-caret-up"></i>
                </div>
                <img src="https://i.ibb.co/PFdwK1D/output-onlinepngtools-2.png" className="bb-img bb-animation"></img>
                <div className="bb-arrow text-center" onClick={this.handlePrevStep}>
                    <i class="fas fa-caret-down"></i>
                </div>
            </div>
        )
    }
}

export default BalloonButton;