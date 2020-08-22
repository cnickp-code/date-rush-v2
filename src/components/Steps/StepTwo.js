import React from 'react';
import { useState, useContext } from 'react';
import config from '../../config';
import DRContext from '../../context/DRContext';

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
    DistanceMatrixService,
} from '@react-google-maps/api';

const libraries = ['places'];
const google = window.google = window.google ? window.google : {};

const StepTwo = () => {

    const [type, setDateType] = useState(null);
    const {
        latLng,
        setCafes,
        setBars,
        handleSetDateType,
        handleSetShowNext,
        handleSetMeal,
        handleSetMealType
    } = useContext(DRContext);


    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: config.GOOGLE_API_KEY,
        libraries
    })

    // const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    //     requestOptions: {
    //         location: { lat: () => latLng.lat, lng: () => latLng.lng },
    //         radius: 20 * 1000,
    //     },
    // });

    const initMap = () => {
        let map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: latLng.lat, lng: latLng.lng },
            zoom: 15
        });

        let typeStr = ['bar', 'cafe'];

        typeStr.forEach(placeType => {
            let service = new google.maps.places.PlacesService(map);
            let request = {
                location: new google.maps.LatLng(latLng.lat, latLng.lng),
                radius: 10000,
                type: [placeType],
                openNow: true,
                // [
                //     'amusement_park', 'campground', 'aquarium', 
                //     'art_gallery', 'bar', 'bowling_alley', 
                //     'campground', 'casino', 'movie_theater',
                //     'museum', 'night_club', 'park', 
                //     'spa', 'tourist_attraction', 'zoo'
                // ],
                // rankBy: google.maps.RankBy.DISTANCE,
            };
            let placeStore = [];
            let placeObj = {};

            service.nearbySearch(request, function (results, status, pagetoken) {
                console.log(results.length);
                for (let i = 0; i < results.length; i++) {
                    // console.log(results[i].name, results[i].types)
                    // console.log(results[i]);
                    let latNum = results[i].geometry.location.lat();
                    let lngNum = results[i].geometry.location.lng();
                    let locationObj = { lat: latNum, lng: lngNum };
                    let placeOpen = true;
                    let placeRating = results[i].rating;
                    let photoUrl = 'https://img.favpng.com/15/13/2/urban-park-cartoon-png-favpng-GyXzR7iKQadY6M60ED5b38UwK.jpg';
                    if (results[i].photos && results[i].photos.length > 0) {
                        photoUrl = results[i].photos[0].getUrl({ maxHeight: 250 });
                    }

                    placeObj = {
                        id: results[i].place_id,
                        name: results[i].name,
                        photoUrl,
                        types: results[i].types,
                        location: locationObj,
                        address: results[i].vicinity,
                        isOpen: placeOpen,
                        rating: placeRating
                    }
                    placeStore.push(placeObj);
                }

                if(placeType === 'bar') {
                    setBars(placeStore);
                } else if(placeType === 'cafe') {
                    setCafes(placeStore);
                }
                // if(pagetoken.hasNextPage) {
                //     handleSetPlaces(placeStore);
                //     pagetoken.nextPage();
                // } else {
                //     handleSetPlaces(placeStore);
                //     handleSetLoader(false);
                //     setForward(true);
                // }

            })
        })
    }

    const replaceInButton = () => {
        setDateType(null);
        setTimeout(() => {
            setDateType('In');
        }, 400);
        handleSetDateType('In')
        handleSetMealType('In')
        handleSetShowNext(true);
        handleSetMeal('In')
    }

    const replaceOutButton = () => {
        setDateType(null);
        setTimeout(() => {
            setDateType('Out');
        }, 400);
        handleSetDateType('Out')
        handleSetMealType('Out')
        handleSetShowNext(true);
        handleSetMeal('Out')
        initMap();
    }

    return (
        <div className="step2-container">
            <div className="border2">


                <h1 className="mb-10 step-header text-center">Step 2</h1>
                <h5 >Eating in or going out?</h5>
                <p className="fs-xs"><i>This will determine whether the generator will give you recipes to cook yourself or restaurants in the area!</i></p>
                <div className="step-button-container mt-20">

                    {(type === 'In') && <button className="item-btn-selected mt-10 pad-5" >Eating In</button>}
                    {!(type === 'In') && <button className="item-btn3 mt-10 pad-5" onClick={replaceInButton}>Eating In</button>}

                    {(type === 'Out') && <button className="item-btn-selected mt-10 pad-5">Going Out</button>}
                    {!(type === 'Out') && <button className="item-btn3 mt-10 pad-5" onClick={replaceOutButton}>Going Out</button>}
                </div>
                <p className="fs-xs text-center mt-10 attention"><i>Make a selection to continue</i></p>
                {/* <div className="step-button-container2 mt-20">
                <button className="item-btn" onClick={handlePreviousStep}>Prev</button>
                <button className="item-btn" onClick={handleNextStep}>Next</button>
            </div> */}
            </div>
            <div id='map'></div>
        </div>
    )
}

export default StepTwo;