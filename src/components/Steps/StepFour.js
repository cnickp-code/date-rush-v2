import React from 'react';
import { useState, useContext } from 'react';
import DRContext from '../../context/DRContext';

const StepFour = () => {

    const [type, setShowType] = useState(null);
    const [nextBool, setNextBool] = useState(false);
    const { handleSetShowNext, handleSetShowType, handleSetShow } = useContext(DRContext);

    const replaceMovieButton = () => {
        setShowType(null);
        handleSetShowType('Movie');
        handleSetShow('Movie');
        setTimeout(() => {
            setShowType('Movie');
        }, 400);
        handleSetShowNext(true);
        setNextBool(true);
    }

    const replaceTVButton = () => {
        setShowType(null);
        handleSetShowType('TV');
        handleSetShow('TV');
        setTimeout(() => {
            setShowType('TV');
        }, 400);
        handleSetShowNext(true);
        setNextBool(true);
    }

    return (
        <div className="step4-container">
            <div className="border2">


                <h1 className="mb-10 step-header text-center">Step 4</h1>
                <h5 >Netflix and... Movie or TV?</h5>
                <p className="fs-xs"><i>This will determine whether the generator will give you a random Movie or TV Show to watch!</i></p>
                <div className="step-button-container mt-20">

                    {(type === 'Movie') && <button className="item-btn4-selected mt-10 pad-5" >Movie</button>}
                    {!(type === 'Movie') && <button className="item-btn4 mt-10 pad-5" onClick={replaceMovieButton}>Movie</button>}

                    {(type === 'TV') && <button className="item-btn4-selected mt-10 pad-5">TV</button>}
                    {!(type === 'TV') && <button className="item-btn4 mt-10 pad-5" onClick={replaceTVButton}>TV</button>}
                </div>
                <p className="fs-xs text-center mt-10 attention"><i>Make a selection to continue</i></p>
                {nextBool &&
                    <h5 className="text-center mt-10 mb-0">Click the blue arrow!</h5>
                }
                {/* <div className="step-button-container2 mt-20">
                <button className="item-btn" onClick={handlePreviousStep}>Prev</button>
                <button className="item-btn" onClick={handleNextStep}>Next</button>
            </div> */}
            </div>
        </div>
    )
}

export default StepFour;