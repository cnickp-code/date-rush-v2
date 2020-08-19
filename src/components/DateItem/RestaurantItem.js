import React from 'react';
import { useState } from 'react';

const RestaurantItem = (props) => {

    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    }

    let restaurantMain = props.restaurant;
    let featuredImg = restaurantMain.featured_image;
    let avgCost = <p className="text-center">Avg Cost for Two: Not Available</p>

    if (restaurantMain.featured_image === '' || restaurantMain.featured_image === null) {
        featuredImg = "https://www.clipartkey.com/mpngs/m/77-776665_lunch-clipart-lunch-date-couple-date-night-cartoon.png"
    }
    if (restaurantMain.average_cost_for_two > 0) {
        avgCost = <p className="text-center">Avg Cost for Two: {'$'}{restaurantMain.average_cost_for_two}</p>
    }

    let stars;
    let rating = restaurantMain.user_rating.aggregate_rating;
    // let rating = 4.5;

    if (rating) {
        stars = [];
        let ratingSplit = rating.toString().split('.');
        let wholeStars = Number(ratingSplit[0]);
        let decimal = Number(ratingSplit[1]);

        for (let i = 0; i < 5; i++) {
            if (i < wholeStars) {
                stars.push(0);
            } else if (i === wholeStars && decimal >= 5) {
                stars.push(1);
            } else {
                stars.push(2);
            }
        }

        stars = stars.map(num => {
            if (num === 0) {
                return <div className="star"><i class="fas fa-star"></i></div>
            } else if (num === 1) {
                return <div className="star"><i class="fas fa-star-half-alt"></i></div>
            } else {
                return <div className="star"><i class="far fa-star"></i></div>
            }
        })
    } else {
        stars = <p className="text-center">No rating found</p>
    }

    return (
        <div className="main-container">
            <div className="border">
                <h3 className="item-header text-center mb-10">{restaurantMain.name}</h3>
                
                <p className="text-center">
                    <img src={featuredImg} className="preview-image mb-10" />
                    {/* <img src='https://www.clipartkey.com/mpngs/m/77-776665_lunch-clipart-lunch-date-couple-date-night-cartoon.png' className="preview-image mb-10" /> */}
                </p>
                {!showDetails &&
                    <div className="info" onClick={toggleDetails}>
                        <i class="fas fa-plus-circle"></i>
                    </div>
                }

                {showDetails && 
                <>
                    <p className="text-center">{restaurantMain.location.address}</p>
                    <p className="text-center">Phone Number: {restaurantMain.phone_numbers}</p>
                    {/* <p className="text-center">123 Fake St.</p>
                    <p className="text-center">Phone Number: 123-345-5678</p> */}

                    <div className="divider center mb-20 mt-20"></div>

                    <p className="text-center">Cuisine Type: {restaurantMain.cuisines}</p>
                    {/* <p className="text-center">Cuisine Type: Asian</p> */}

                    <div className="divider center mb-20 mt-20"></div>

                    <p className="text-center">Price Range: {'$'.repeat(restaurantMain.price_range)}</p>
                    {/* <p className="text-center">Price Range: $$$$</p> */}
                    {avgCost}

                    <div className="divider center mb-20 mt-20"></div>

                    <div className="rating-container">
                        {stars}
                    </div>
                    <div className="divider center mb-20 mt-20"></div>

                    <div className="flex-center flex-col mt-10">
                        <a href={restaurantMain.url} className="item-btn center" target="_blank">See Full Details</a>
                        {/* <a href='' className="item-btn center" target="_blank">See Full Details</a> */}
                        <p className="text-center fs-xs mt-5"><i>Powered By Zomato</i></p>
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

export default RestaurantItem;