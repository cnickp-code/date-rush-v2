import React from 'react';
import { useState } from 'react';
import mapStyles from '../../services/map-style';

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
    DistanceMatrixService,
} from '@react-google-maps/api';

const ActivityItem = (props) => {

    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    }

    const mapContainerStyle = {
        width: '200px',
        height: '200px'
    }
    // const center = props.activity.location;
    const center = {
        lat: 43.653225,
        lng: -79.383186
    }
    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
    }

    let openDisplay = <p className="text-center closed">Closed</p>
    let openBool = props.activity.isOpen;
    // let openBool = true;

    if (openBool) {
        openDisplay = <p className="text-center open">Open Now</p>
    }

    let stars;
    let rating = props.activity.rating;
    // let rating = 4.3;

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


                <h3 className="item-header text-center mb-10">{props.activity.name}</h3>
                {/* <h3 className="item-header text-center mb-10">Fake Monument</h3> */}
                <p className="text-center">
                    <img src={props.activity.photoUrl} className="preview-image mb-10" />
                    {/* <img src='https://img.favpng.com/15/13/2/urban-park-cartoon-png-favpng-GyXzR7iKQadY6M60ED5b38UwK.jpg' className="preview-image mb-10" /> */}
                </p>

                {!showDetails &&
                    <div className="info" onClick={toggleDetails}>
                        <i class="fas fa-plus-circle"></i>
                    </div>
                }

                {showDetails &&
                <>
                    <div className="flex-container2">


                        <div className="left-activity-container">
                            <p className="text-center">{props.activity.address}</p>
                            {/* <p className="text-center color-p">123 Fake St.</p> */}

                            <div className="divider"></div>

                            <div className="open-container center">
                                {openDisplay}
                            </div>


                            <div className="divider"></div>

                            <div className="rating-container">
                                {stars}
                            </div>

                            <div className="divider"></div>

                        </div>




                        <div className="right-activity-container">
                            <div className="map-container" >
                                <GoogleMap
                                    mapContainerStyle={mapContainerStyle}
                                    zoom={13}
                                    center={center}
                                    options={options}
                                >
                                    <Marker position={center} />

                                </GoogleMap>
                            </div>
                        </div>

                    </div>
                    <div className="info" onClick={toggleDetails}>
                        <i class="fas fa-minus-circle"></i>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default ActivityItem;