import React from 'react';
import ActivityItem from '../DateItem/ActivityItem';
import MealItem from '../DateItem/MealItem';
import Drinkitem from '../DateItem/DrinkItem';
import RestaurantItem from '../DateItem/RestaurantItem';
import ShowItem from '../DateItem/ShowItem';
import DRContext from '../../context/DRContext';

class Results extends React.Component {
    static contextType = DRContext;
    constructor(props) {
        super(props);
        this.state = {
            carousel: false,
            carStep: 0,
            type: null
        }
    }

    setTypeActivity = () => {
        this.setState({
            carousel: true,
            type: 'Activity',
            carStep: 0,
        })
        this.context.handleSetActivity(0)

    }
    setTypeMeal = () => {
        this.setState({
            carousel: true,
            type: 'Meal',
            carStep: 0,
        })
    }
    setTypeDrink = () => {
        this.setState({
            carousel: true,
            type: 'Drink',
            carStep: 0,
        })
    }
    setTypeShow = () => {
        this.setState({
            carousel: true,
            type: 'Show',
            carStep: 0,
        })
    }

    handleShowSaveOverlay = () => {
        this.context.toggleSaveBool(true);
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = 'no';
        this.setState({
            carousel: false,
            carStep: 0,
            type: null
        })
    }

    handleGoBack = () => {
        this.context.handleSetStep(6);
        this.context.handleSetSummaryBool(false);
    }

    prevStep = () => {
        this.setState({
            carStep: this.state.carStep - 1
        })
        this.context.handleSetActivity(this.state.carStep - 1)
    }

    nextStep = () => {
        this.setState({
            carStep: this.state.carStep + 1
        })
        this.context.handleSetActivity(this.state.carStep + 1)
    }

    render() {
        let header = <h1 className="results-header text-center mb-10">Your Date!</h1>

        if (this.context.summaryBool) {
            header = <h1 className="results-header text-center mb-10">{this.context.summaryDate.name}</h1>
        }

        return (
            <div className="results-container">
                {header}
                <div className="upper-results">
                    <div className="left-results-container">
                        <p className="results-location"><i className="fas fa-map-marked-alt"></i> {' '} {this.context.location}</p>
                        <p className="fs-xs color-p"><i>Click the buttons to show each category</i></p>
                    </div>
                    {!this.context.summaryBool &&
                        <div className="right-results-container">
                            <button className="item-btn" onClick={this.handleShowSaveOverlay}>Save Date</button>
                        </div>}
                    {this.context.summaryBool &&
                        <div className="right-results-container">
                            <button className="item-btn" onClick={this.handleGoBack}>Go Back</button>
                        </div>
                    }
                </div>

                <div className="results-buttons mt-20">
                    <button className="item-btn3" onClick={this.setTypeActivity}><i className="fas fa-tree home-step-icon"></i></button>
                    <button className="item-btn3" onClick={this.setTypeMeal}><i className="fas fa-hamburger home-step-icon"></i></button>
                    <button className="item-btn3" onClick={this.setTypeDrink}><i className="fas fa-cocktail home-step-icon"></i></button>
                    <button className="item-btn3" onClick={this.setTypeShow}><i className="fas fa-tv home-step-icon"></i></button>
                </div>

                {this.state.carousel && !this.context.summaryBool &&
                <div className="carousel center">  
                    {!(this.state.carStep === 0) && <div className="bb-arrow" onClick={this.prevStep}><i className="fas fa-caret-left"></i></div>}
                    {(this.state.carStep === 0) && <div className="res-arrow" ><i className="fas fa-caret-left"></i></div>}
                    <div className={((this.state.carStep === 0) ? "res-circle res-shine" : "res-circle")}><i className="fas fa-circle"></i></div>
                    <div className={((this.state.carStep === 1) ? "res-circle res-shine" : "res-circle")}><i className="fas fa-circle"></i></div>
                    <div className={((this.state.carStep === 2) ? "res-circle res-shine" : "res-circle")}><i className="fas fa-circle"></i></div>
                    {!(this.state.carStep === 2) && <div className="bb-arrow" onClick={this.nextStep}><i className="fas fa-caret-right"></i></div>}
                    {(this.state.carStep === 2) && <div className="res-arrow" ><i className="fas fa-caret-right"></i></div>}
                </div>}

                {(this.state.type === 'Activity') && <ActivityItem activity={this.context.activity} />}
                {(this.state.type === 'Meal') && (this.context.mealType === 'In') && <MealItem meal={this.context.meal} />}
                {(this.state.type === 'Meal') && (this.context.mealType === 'Out') && <RestaurantItem restaurant={this.context.restaurant} />}
                {(this.state.type === 'Drink') && (this.context.mealType === 'In') && <Drinkitem drink={this.context.drink} />}
                {(this.state.type === 'Drink') && (this.context.mealType === 'Out') && (this.context.drinkType === 'NA') && <ActivityItem activity={this.context.cafe} />}
                {(this.state.type === 'Drink') && (this.context.mealType === 'Out') && (this.context.drinkType === 'Alc') && <ActivityItem activity={this.context.bar} />}
                {(this.state.type === 'Show') && <ShowItem movieBool={this.context.movieBool} show={this.context.show} />}
            </div>
        )
    }
}

export default Results;