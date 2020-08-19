import React from 'react';
import { useState, useContext } from 'react';
import DRContext from '../../context/DRContext';

const StepFour = () => {

    const [type, setShowType] = useState(null);
    const { handleSetStep, handleSetShowNext, handleSetShowType, handleSetShow } = useContext(DRContext);

    const replaceMovieButton = () => {
        setShowType(null);
        handleSetShowType('Movie');
        handleSetShow('Movie');
        setTimeout(() => {
            setShowType('Movie');
        }, 400);
        handleSetShowNext(true);
    }

    const replaceTVButton = () => {
        setShowType(null);
        handleSetShowType('TV');
        handleSetShow('TV');
        setTimeout(() => {
            setShowType('TV');
        }, 400);
        handleSetShowNext(true);
    }

    const handlePreviousStep = () => {
        document.body.classList.remove('body-pos-step4');
        document.body.classList.add('body-pos-step3');
        handleSetStep(3);
    }

    const handleNextStep = () => {
        document.body.classList.remove('body-pos-step4');
        document.body.classList.add('body-pos-results');
        handleSetStep(5);
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
                {!(type === 'TV') && <button className="item-btn4 mt-10 pad-5"onClick={replaceTVButton}>TV</button>}
            </div>
            {/* <div className="step-button-container2 mt-20">
                <button className="item-btn" onClick={handlePreviousStep}>Prev</button>
                <button className="item-btn" onClick={handleNextStep}>Next</button>
            </div> */}
            </div>
        </div>
    )
}

export default StepFour;