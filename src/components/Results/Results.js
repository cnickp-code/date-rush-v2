import React from 'react';
import ActivityItem from '../DateItem/ActivityItem';
import MealItem from '../DateItem/MealItem';
import Drinkitem from '../DateItem/DrinkItem';
import RestaurantItem from '../DateItem/RestaurantItem';
import ShowItem from '../DateItem/ShowItem';
import DRContext from '../../context/DRContext';
import NotFoundItem from '../DateItem/NotFoundItem';

class Results extends React.Component {
    static contextType = DRContext;
    constructor(props) {
        super(props);
        this.state = {
            type: null
        }
    }

    setTypeActivity = () => {
        this.setState({
            type: 'Activity'
        })
    }
    setTypeMeal = () => {
        this.setState({
            type: 'Meal'
        })
    }
    setTypeDrink = () => {
        this.setState({
            type: 'Drink'
        })
    }
    setTypeShow = () => {
        this.setState({
            type: 'Show'
        })
    }

    handleShowSaveOverlay = () => {
        this.context.toggleSaveBool(true);
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = 'no';
    }

    handleGoBack = () => {
        this.context.handleSetStep(6);
        this.context.handleSetSummaryBool(false);
        this.context.handleReset();
    }

    handleRandom = () => {
        if (this.state.type === 'Activity') {
            this.context.handleSetRandomActivity();
        } else if (this.state.type === 'Drink') {
            if (this.context.mealType === 'Out') {
                this.context.handleSetDrinkPlace(this.context.drinkType);
            } else {
                this.context.handleSetDrink(this.context.drinkType);
            }
        } else if (this.state.type === 'Meal') {
            if (this.context.mealType === 'Out') {
                this.context.handleSetRandomRestaurant();
            } else {
                this.context.handleSetMeal('In');
            }
        } else if (this.state.type === 'Show') {
            this.context.handleSetShow(this.context.showType);
        }
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
                        <p className="results-location"><i class="fas fa-map-marked-alt"></i> {' '} {this.context.location}</p>
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

                {!this.context.summaryBool && this.state.type &&
                <div className="next-button mt-20">
                    <button className="item-btn" onClick={this.handleRandom}>Next</button>
                </div>}

                {(this.context.restaurant === undefined || this.context.restaurant === null) &&
                    (this.state.type === 'Meal') &&
                    (this.context.mealType === 'Out') &&
                    <NotFoundItem />}

                {(this.context.activity === undefined || this.context.activity === null) &&
                    (this.state.type === 'Activity') &&
                    <NotFoundItem />}

                {(this.context.cafe === undefined || this.context.cafe === null) &&
                    (this.state.type === 'Drink') &&
                    (this.context.mealType === 'Out') &&
                    (this.context.drinkType === 'NA') &&
                    <NotFoundItem />}

                {(this.context.bar === undefined || this.context.bar === null) &&
                    (this.state.type === 'Drink') &&
                    (this.context.mealType === 'Out') &&
                    (this.context.drinkType === 'Alc') &&
                    <NotFoundItem />}

                {!(this.context.cafe === undefined) &&
                    !this.context.summaryBool &&
                    (this.state.type === 'Drink') &&
                    (this.context.mealType === 'Out') &&
                    (this.context.drinkType === 'NA') &&
                    <ActivityItem activity={this.context.cafe} />}

                {!(this.context.bar === undefined) &&
                    !this.context.summaryBool &&
                    (this.state.type === 'Drink') &&
                    (this.context.mealType === 'Out') &&
                    (this.context.drinkType === 'Alc') &&
                    <ActivityItem activity={this.context.bar} />}

                {!(this.context.activity === undefined || this.context.activity === null) &&
                    (this.state.type === 'Activity') &&
                    <ActivityItem activity={this.context.activity} />}

                {!(this.context.restaurant === undefined || this.context.restaurant === null) &&
                    (this.state.type === 'Meal') &&
                    (this.context.mealType === 'Out') &&
                    <RestaurantItem restaurant={this.context.restaurant} />}

                {(this.state.type === 'Meal') &&
                    (this.context.mealType === 'In') &&
                    <MealItem meal={this.context.meal} />}

                {(this.state.type === 'Drink') &&
                    (this.context.mealType === 'In') &&
                    <Drinkitem drink={this.context.drink} />}

                {!(this.context.cafe === undefined || this.context.cafe === null) &&
                    this.context.summaryBool &&
                    (this.state.type === 'Drink') &&
                    (this.context.mealType === 'Out') &&
                    (this.context.drinkType === 'NA') &&
                    <ActivityItem activity={this.context.drink} />}

                {!(this.context.bar === undefined || this.context.bar === null) &&
                    this.context.summaryBool && (this.state.type === 'Drink') &&
                    (this.context.mealType === 'Out') &&
                    (this.context.drinkType === 'Alc') &&
                    <ActivityItem activity={this.context.drink} />}

                {(this.state.type === 'Show') &&
                    <ShowItem movieBool={this.context.movieBool} show={this.context.show} />}
            </div>
        )
    }
}

export default Results;