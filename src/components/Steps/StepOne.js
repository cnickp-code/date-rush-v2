import React from 'react';
import { useContext, useState, useEffect } from 'react';
import DRContext from '../../context/DRContext';
import config from '../../config';
import mapStyles from '../../services/map-style';

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
    height: '250px'
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

    const { handleSetLocation, handleSetPlaces } = useContext(DRContext);
    const [address, setAddress] = useState(null);
    const [latLng, setLatLng] = useState(null);


    let tempLoc = center;

    if(latLng) {
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
            radius: 30000,
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
        initMap();
    }

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, [])

    return (
        <div className="step-container">
            <h1 className="mb-10 step-header">Step 1</h1>
            <h5 >Set a location</h5>
            <p className="mb-10 fs-xs"><i>Compass uses current location</i></p>
            <form id="home-form" onSubmit={handleSubmit}>

                <div className="combobox-container">
                    <Combobox
                        onSelect={async (address) => {
                            setValue(address, false);
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
                            {status === 'OK' && data.map(({ id, description }, i) => <ComboboxOption key={i} value={description} />)}
                        </ComboboxPopover>
                    </Combobox>

                    <div className="compass"></div>
                </div>

                <div className="map-container mt-20" >
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={13}
                        center={tempLoc}
                        options={options}
                    >
                        <Marker position={tempLoc} />

                    </GoogleMap>
                </div>

                <button type="submit" className="item-btn2 mt-10 pad-5">Next Step</button>


            </form>


            <div id='map'></div>

        </div>
    )
}

export default StepOne;