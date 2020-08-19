import React from 'react';
import { useContext } from 'react';
import DRContext from '../../context/DRContext';
import DateRushApiService from '../../context/DRContext';
import ExtApiService from '../../services/external-api-service';

const google = window.google = window.google ? window.google : {};

const ProfileItem = (props) => {

    const {
        handleSetStep,
        handleSetOnlyLocation,
        handleDeleteDateItem,
        handleSetSummaryActivity,
        handleSetSummaryMeal,
        handleSetSummaryRestaurant,
        handleSetSummaryDrink,
        handleSetSummaryShow,
        handleSetShowType,
        handleSetMealType,
        handleSetSummaryDate,
        handleSetSummaryBool
    } = useContext(DRContext);

    const handleSummary = () => {
        let date = props.date;
        handleSetStep(5);
        handleSetSummaryBool(true);
        handleSetSummaryDate(date);
        handleSetOnlyLocation(date.location);
        initMap();

        if (props.date.meal_type === 'In') {
            ExtApiService.getMealById(Number(props.date.meal_id))
                .then(results => {
                    handleSetMealType('In')
                    handleSetSummaryMeal(results.meals[0])
                })
        } else if (props.date.meal_type === 'Out') {
            ExtApiService.getRestaurantById(props.date.meal_id)
                .then(restaurant => {
                    handleSetMealType('Out')
                    handleSetSummaryRestaurant(restaurant)
                })
        }

        ExtApiService.getDrinkById(Number(props.date.drink_id))
            .then(results => {
                handleSetSummaryDrink(results.drinks[0])
            })

        if (props.date.show_type === 'Movie') {
            ExtApiService.getMovieById(props.date.show_id)
                .then(show => {
                    let genre_ids = [];
                    show.genres.forEach(genre => {
                        genre_ids.push(genre.id);
                    })

                    let newShow = {
                        ...show,
                        genre_ids
                    }
                    handleSetSummaryShow(newShow);
                    handleSetShowType('Movie');
                })
        } else if(props.date.show_type === 'TV') {
            ExtApiService.getTvShowById(props.date.show_id)
                .then(show => {
                    let genre_ids = [];
                    show.genres.forEach(genre => {
                        genre_ids.push(genre.id);
                    })

                    let newShow = {
                        ...show,
                        genre_ids
                    }
                    handleSetSummaryShow(newShow)
                    handleSetShowType('TV');
                })
        }

    }

    const handleDeleteItem = () => {
        DateRushApiService.deleteDateItem(props.date.id, handleDeleteDateItem);
    }

    const initMap = () => {
        let map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 43.653225, lng: -79.383186 },
            zoom: 15
        });
        let service = new google.maps.places.PlacesService(map);
        let request = {
            placeId: props.date.place_id
        }

        let placeObj = {};

        service.getDetails(request, function (results, status, pagetoken) {
            console.log(results);
            let latNum = results.geometry.location.lat();
            let lngNum = results.geometry.location.lng();
            let locationObj = { lat: latNum, lng: lngNum };
            let placeOpen = true;
            let placeRating = results.rating;
            let photoUrl = 'https://img.favpng.com/15/13/2/urban-park-cartoon-png-favpng-GyXzR7iKQadY6M60ED5b38UwK.jpg';
            if (results.photos && results.photos.length > 0) {
                photoUrl = results.photos[0].getUrl({ maxHeight: 250 });
            }


            placeObj = {
                id: results.place_id,
                name: results.name,
                photoUrl,
                types: results.types,
                location: locationObj,
                address: results.vicinity,
                isOpen: placeOpen,
                rating: placeRating
            }

            handleSetSummaryActivity(placeObj);
        })
    }

    return (
        <>
        <div className="pi-container">
            <h3 className="pi-title" onClick={handleSummary}>{props.date.name}</h3>
            <div className="pi-delete" onClick={handleDeleteItem}>
                <i className="fs-xl fas fa-trash-alt trash"></i>
            </div>
            
        </div>
        <div id='map'></div>
        </>
    )
}

export default ProfileItem;