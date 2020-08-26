import React from 'react';
import { useContext, useState, useEffect } from 'react';
import DRContext from '../../context/DRContext';
import config from '../../config';
import mapStyles from '../../services/map-style';
import ExtApiService from '../../services/external-api-service';

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
    DistanceMatrixService,
} from '@react-google-maps/api';
import PlacesAutocomplete, {
    getGeoCode,
    getLatLng,
    getGeocode
} from 'use-places-autocomplete';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from '@reach/combobox';
import '@reach/combobox/styles.css'
import usePlacesAutocomplete from 'use-places-autocomplete';

const mapContainerStyle = {
    width: '250px',
    height: '150px'
}

const center = {
    lat: 43.653225,
    lng: -79.383186
}
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
}




const libraries = ['places'];
const google = window.google = window.google ? window.google : {};

const StepOne = () => {

    const { handleSetLocation, handleSetPlaces, handleSetShowNext, handleSetInitialDrink } = useContext(DRContext);
    const [address, setAddress] = useState(null);
    const [locBool, setLocBool] = useState(false);
    const [nextBool, setNextBool] = useState(false);
    const [latLng, setLatLng] = useState({});

    useEffect(() => {
        ExtApiService.getAlcDrinks()
            .then(drinks => {
                handleSetInitialDrink(drinks.drinks[0])
            })
    }, [])


    let tempLoc = center;

    if (Object.keys(latLng).length > 0) {
        tempLoc = latLng;
    }

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: config.GOOGLE_API_KEY,
        libraries
    })

    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => latLng.lat, lng: () => latLng.lng },
            radius: 20 * 1000,
        },
    });

    const initMap = () => {
        let map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: latLng.lat, lng: latLng.lng },
            zoom: 15
        });

        let service = new google.maps.places.PlacesService(map);
        let request = {
            location: new google.maps.LatLng(latLng.lat, latLng.lng),
            radius: 10000,
            type: ['tourist_attraction'],
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

            handleSetPlaces(placeStore);
            // if(pagetoken.hasNextPage) {
            //     handleSetPlaces(placeStore);
            //     pagetoken.nextPage();
            // } else {
            //     handleSetPlaces(placeStore);
            //     handleSetLoader(false);
            //     setForward(true);
            // }

        })

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        handleSetLocation(latLng, address);
        handleSetShowNext(true);
        setNextBool(true);
        initMap();
    }

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, [])

    return (
        <div className="step-container">
            <div className="border2">
                <h1 className="mb-10 step-header text-center">Step 1</h1>
                <div className="s1-top-container">
                    <div className="s1-left">
                        <h5 >Set a location</h5>
                        <p className="mb-10 fs-xs"><i>Enter an address or click the compass to use your current location. Must set location to continue.</i></p>
                    </div>

                </div>

                <form id="home-form" onSubmit={handleSubmit}>

                    <div className="combobox-container">
                        <Combobox
                            onSelect={async (address) => {
                                setValue(address, false);
                                setLocBool(true)
                                clearSuggestions();
                                try {
                                    const results = await getGeocode({ address });
                                    const { lat, lng } = await getLatLng(results[0]);
                                    const latLngObj = { lat: lat, lng: lng };

                                    setLatLng(latLngObj);
                                    setAddress(address);

                                } catch (e) {
                                    console.log('error!')
                                }
                            }}
                        >
                            <ComboboxInput
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value)


                                }}
                                disabled={!ready}
                                placeholder='Enter a city'
                                className='search'
                            />
                            <ComboboxPopover>
                                <ComboboxList className="step-popover">
                                    {status === 'OK' && data.map(({ id, description }, i) => <ComboboxOption key={i} value={description} />)}
                                </ComboboxList>
                            </ComboboxPopover>
                        </Combobox>


                    </div>

                    <div className="map-container mt-20" >
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={13}
                            center={tempLoc}
                            options={options}
                        >
                            <div className="compass" onClick={() => {
                                navigator.geolocation.getCurrentPosition((position) => {
                                    let locationObj = { lat: position.coords.latitude, lng: position.coords.longitude };
                                    let latLngStr = `${position.coords.latitude},${position.coords.longitude}`
                                    setLatLng(locationObj);
                                    ExtApiService.getLocationName(latLngStr)
                                        .then(result => {
                                            setLocBool(true)
                                            setAddress(result.results[1].formatted_address);
                                        })
                                }
                                    , () => null)
                            }}></div>
                            <Marker position={tempLoc} />

                        </GoogleMap>
                    </div>

                    {locBool &&
                        <>
                            <p className="fs-xs text-center mt-10"><i>Using Current Location</i></p>
                            <p className="fs-xs text-center"><i>{address}</i></p>
                        </>}

                    <div className="flex-center">
                        <button disabled={!locBool} type="submit" className="item-btn mt-10 pad-5 center">Set Location</button>
                    </div>

                    {nextBool &&
                        <h5 className="text-center mt-10 mb-0">Click the blue arrow!</h5>
                    }

                </form>

                <div id='map'></div>
            </div>

        </div>
    )
}

export default StepOne;