import React from 'react';
import DRContext from '../../context/DRContext';
import DateRushApiService from '../../services/dr-api-service';

class SaveDateOverlay extends React.Component {
    static contextType = DRContext;

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { name } = e.target

        let meal_id;
        let drink_id;
        let place_id = 'placeholder'

        if (this.context.dateType === 'Out' ) {
            meal_id = this.context.restaurant.id;
            if (this.context.drinkType === 'Alc' && this.context.bars.length > 0) {
                drink_id = this.context.bar.id;
            } else if (this.context.drinkType === 'NA' && this.context.cafes > 0) {
                drink_id = this.context.cafe.id;
            } else {
                drink_id = 'placeholder';
            }
        } else {
            meal_id = this.context.meal.idMeal;
            drink_id = this.context.drink.idDrink;
        }

        if(this.context.places.length > 0) {
            place_id = this.context.activity.id;
        }

        let newDate = {
            name: name.value,
            location: this.context.location,
            place_id,
            meal_id,
            meal_type: this.context.dateType,
            drink_id,
            drink_type: this.context.drinkType,
            show_id: this.context.show.id,
            show_type: this.context.showType,
        }

        console.log('NEW DATE', newDate);

        DateRushApiService.postDate(newDate)
            .then(date => {
                this.context.handleAddProfileDates(date);
                this.context.handleSetStep(6);
                document.documentElement.style.overflow = 'scroll';
                document.body.scroll = 'yes';
                this.context.toggleSaveBool(false);
            })

    }

    closeOverlay = () => {
        this.context.toggleSaveBool(false);
        document.documentElement.style.overflow = 'scroll';
        document.body.scroll = 'yes';
    }

    render() {
        return (
            <div className="overlay-container">
                <div className="sd-modal">
                    <form id="name-submit" onSubmit={this.handleSubmit}>
                        <h1 className="item-header text-center">Name Your Date</h1>
                        <input id="name" className="sd-text" maxlength="25" placeholder="Type name here" onChange={this.handleInputChange} required />
                        <div className="save-btn-container">
                            <button type="submit" className="item-btn2">Save</button>
                            <button className="item-btn2" onClick={this.closeOverlay}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SaveDateOverlay;