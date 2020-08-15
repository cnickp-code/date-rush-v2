import React from 'react';
import ActivityItem from '../DateItem/ActivityItem';
import MealItem from '../DateItem/MealItem';
import Drinkitem from '../DateItem/DrinkItem';
import RestaurantItem from '../DateItem/RestaurantItem';
import ShowItem from '../DateItem/ShowItem';

class Results extends React.Component {
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

    render() {
        return (
            <div className="results-container">
                <h1 className="step-header text-center mb-10">Your Date!</h1>
                <p className="results-location"><i class="fas fa-map-marked-alt"></i> {' '} Current Location</p>
                <p className="text-center fs-xs color-p"><i>Click the buttons to show each category</i></p>
                <div className="results-buttons mt-20">
                    <button className="item-btn3" onClick={this.setTypeActivity}><i className="fas fa-tree home-step-icon"></i></button>
                    <button className="item-btn3" onClick={this.setTypeMeal}><i className="fas fa-hamburger home-step-icon"></i></button>
                    <button className="item-btn3" onClick={this.setTypeDrink}><i className="fas fa-cocktail home-step-icon"></i></button>
                    <button className="item-btn3" onClick={this.setTypeShow}><i className="fas fa-tv home-step-icon"></i></button>
                </div>
                {(this.state.type === 'Activity') && <ActivityItem />}
                {(this.state.type === 'Meal') && <MealItem />}
                {/* <RestaurantItem /> */}
                {(this.state.type === 'Drink') && <Drinkitem /> }
                {(this.state.type === 'Show') && <ShowItem />}
            </div>
        )
    }
}

export default Results;