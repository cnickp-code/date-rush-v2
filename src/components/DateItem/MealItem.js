import React from 'react';
import { useState } from 'react';

const MealItem = (props) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    }

    // console.log(props.meal);
    return (
        <div className="main-container">
            <div className="border">
                <h3 className="item-header text-center mb-10">{props.meal.strMeal}</h3>
                {/* <h3 className="item-header text-center mb-10">Beef Wellington</h3> */}
                <p className="text-center">
                    <img src={props.meal.strMealThumb} className="preview-image mb-10" />
                    {/* <img src='https://www.clipartkey.com/mpngs/m/77-776665_lunch-clipart-lunch-date-couple-date-night-cartoon.png' className="preview-image mb-10" /> */}
                </p>
                {!showDetails &&
                    <div className="info" onClick={toggleDetails}>
                        <i class="fas fa-plus-circle"></i>
                    </div>
                }

                {showDetails &&
                    <>
                        <p className="text-center mb-20 color-p">Category: {props.meal.strArea}</p>
                        {/* <p className="text-center mb-20 color-p">Category: Asian</p> */}
                        <div className="flex-center">
                            <a href={props.meal.strSource} className="item-btn center" target="_blank">View Recipe</a>
                            {/* <a href='' className="item-btn center" target="_blank">View Recipe</a> */}
                        </div>
                        <div className="info" onClick={toggleDetails}>
                            <i class="fas fa-minus-circle"></i>
                        </div>
                    </>
                }
            </div>

        </div>
    )
}

export default MealItem;