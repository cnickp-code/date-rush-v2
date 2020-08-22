import React from 'react';
import { useState, useContext } from 'react';
import DRContext from '../../context/DRContext';

const StepThree = () => {

    const [type, setDrinkType] = useState(null);
    const { handleSetStep, handleSetShowNext, handleSetDrink } = useContext(DRContext);

    const replaceAlcButton = () => {
        setDrinkType(null);
        setTimeout(() => {
            setDrinkType('Alc');
        }, 400);
        handleSetShowNext(true)
        handleSetDrink('Alc');
    }

    const replaceNAButton = () => {
        setDrinkType(null);
        setTimeout(() => {
            setDrinkType('NA');
        }, 400);
        handleSetShowNext(true);
        handleSetDrink('NA');
    }

    return (
        <div className="step3-container">
            <div className="border2">
                <h1 className="mb-10 step-header text-center">Step 3</h1>
                <h5 >Do you drink?</h5>
                <p className="fs-xs"><i>This will determine whether the generator will give you cocktails if you're staying in, bars in the area if you're going out, or non-alcoholic drinks to make for fun!</i></p>
                <div className="step-button-container mt-20">

                    {(type === 'Alc') && <button className="item-btn4-selected mt-10 pad-5" >Yes</button>}
                    {!(type === 'Alc') && <button className="item-btn4 mt-10 pad-5" onClick={replaceAlcButton}>Yes</button>}

                    {(type === 'NA') && <button className="item-btn4-selected mt-10 pad-5">No</button>}
                    {!(type === 'NA') && <button className="item-btn4 mt-10 pad-5" onClick={replaceNAButton}>No</button>}
                </div>
                {/* <div className="step-button-container2 mt-20">
                    <button className="item-btn" onClick={handlePreviousStep}>Prev</button>
                    <button className="item-btn" onClick={handleNextStep}>Next</button>
                </div> */}
            </div>
        </div>
    )
}

export default StepThree;