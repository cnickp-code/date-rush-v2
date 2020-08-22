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
        if (this.context.dateType === 'Out') {
            meal_id = this.context.restaurant.id;
        } else {
            meal_id = this.context.meal.idMeal;
        }


        let newDate = {
            name: name.value,
            location: this.context.location,
            place_id: this.context.activity.id,
            meal_id,
            meal_type: this.context.dateType,
            drink_id: this.context.drink.idDrink,
            show_id: this.context.show.id,
            show_type: this.context.showType,
        }

        console.log(newDate);

        DateRushApiService.postDate(newDate)
            .then(date => {
                this.context.handleAddProfileDates(date);
                this.context.handleSetStep(6);
                document.documentElement.style.overflow = 'scroll';
                document.body.scroll = 'yes';
                this.context.toggleSaveBool();
            })

    }

    closeOverlay = () => {
        this.context.toggleSaveBool();
        document.documentElement.style.overflow = 'scroll';
        document.body.scroll = 'yes';
    }

    render() {
        return (
            <div className="overlay-container">
                <div className="sd-modal">
                    <div className="exit" onClick={this.closeOverlay}>
                        <i class="far fa-times-circle"></i>
                    </div>
                    <form id="name-submit" onSubmit={this.handleSubmit}>
                        <h1 className="item-header text-center">Name Your Date</h1>
                        <input id="name" className="sd-text" placeholder="Type name here" onChange={this.handleInputChange} />
                        <p className="text-center">
                            <button type="submit" className="item-btn2">Save</button>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

export default SaveDateOverlay;