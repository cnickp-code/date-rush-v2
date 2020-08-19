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
        console.log(this.context.meal);
        return (
            <div className="results-container">
                <h1 className="results-header text-center mb-10">Your Date!</h1>
                <div className="upper-results">
                    <div className="left-results-container">
                        <p className="results-location"><i class="fas fa-map-marked-alt"></i> {' '} {this.context.location}</p>
                        <p className="fs-xs color-p"><i>Click the buttons to show each category</i></p>
                    </div>
                    <div className="right-results-container">
                        <button className="item-btn">Save Date</button>
                    </div>
                </div>

                <div className="results-buttons mt-20">
                    <button className="item-btn3" onClick={this.setTypeActivity}><i className="fas fa-tree home-step-icon"></i></button>
                    <button className="item-btn3" onClick={this.setTypeMeal}><i className="fas fa-hamburger home-step-icon"></i></button>
                    <button className="item-btn3" onClick={this.setTypeDrink}><i className="fas fa-cocktail home-step-icon"></i></button>
                    <button className="item-btn3" onClick={this.setTypeShow}><i className="fas fa-tv home-step-icon"></i></button>
                </div>
                {(this.state.type === 'Activity') && <ActivityItem activity={this.context.activity}/>}
                {(this.state.type === 'Meal') && <MealItem meal={this.context.meal}/>}
                {/* <RestaurantItem /> */}
                {(this.state.type === 'Drink') && <Drinkitem drink={this.context.drink} />}
                {(this.state.type === 'Show') && <ShowItem movieBool={this.context.movieBool} show={this.context.show} />}
            </div>
        )
    }
}

export default Results;