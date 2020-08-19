import React from 'react';
import { useState } from 'react';

const DrinkItem = (props) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    }

    let i = 1;
    let ingredientArray = [];

    while (props.drink[`strIngredient${i}`]) {
        let measure = 'Not Specified'
        if (props.drink[`strMeasure${i}`]) {
            measure = props.drink[`strMeasure${i}`];
        }


        let ingredientString = props.drink[`strIngredient${i}`] + ': ' + measure
        ingredientArray.push(ingredientString);
        i++;
    }

    ingredientArray = ingredientArray.map((entry, i) => {
        return <p key={i} className="mb-5">{entry}</p>
    })

    // let ingredientArray = [<p className="mb-5">Gin: 10 shots</p>];

    return (
        <div className="main-container">
            <div className="border">


                <h3 className="item-header text-center mb-10">{props.drink.strDrink}</h3>
                {/* <h3 className="item-header text-center mb-10">Bloody Mary</h3> */}
                <div className="flex-container2">
                    <div className="left-drink-container">
                        <p className="text-center">
                            <img src={props.drink.strDrinkThumb} className="preview-image mb-10" />
                            {/* <img src='https://www.clipartkey.com/mpngs/m/77-776665_lunch-clipart-lunch-date-couple-date-night-cartoon.png' className="preview-image mb-10" /> */}
                        </p>
                        {!showDetails &&
                            <div className="info" onClick={toggleDetails}>
                                <i class="fas fa-plus-circle"></i>
                            </div>
                        }
                    </div>

                    {showDetails &&
                        <div className="right-drink-container">
                            <h4 className="mb-10 mt-10 text-center">{props.drink.strAlcoholic}</h4>
                            {/* <h4 className="mb-10 mt-10 text-center">Alcoholic</h4> */}

                            <div className="divider center mb-20 mt-20"></div>

                            <h4 className="text-center mb-10 mt-10">Ingredients:</h4>
                            {ingredientArray}

                            <div className="divider center mb-20 mt-20"></div>

                            <h4 className="text-center mt-10 mb-10">Instructions:</h4>
                            <p>{props.drink.strInstructions}</p>
                            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> */}
                            <div className="info" onClick={toggleDetails}>
                                <i class="fas fa-minus-circle"></i>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default DrinkItem;