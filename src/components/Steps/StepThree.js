import React from 'react';
import { useState, useContext } from 'react';
import DRContext from '../../context/DRContext';

const StepThree = () => {

    const [type, setDrinkType] = useState(null);
    const { handleSetStep } = useContext(DRContext);

    const replaceAlcButton = () => {
        setDrinkType(null);
        setTimeout(() => {
            setDrinkType('Alc');
        }, 400);
    }

    const replaceNAButton = () => {
        setDrinkType(null);
        setTimeout(() => {
            setDrinkType('NA');
        }, 400);
    }

    const handlePreviousStep = () => {
        document.body.classList.remove('body-pos-step3');
        document.body.classList.add('body-pos-step2');
        handleSetStep(2);
    }

    const handleNextStep = () => {
        document.body.classList.remove('body-pos-step3');
        document.body.classList.add('body-pos-step4');
        handleSetStep(4);
    }

    return (
        <div className="step3-container">
            <div className="border2">
                <h1 className="mb-10 step-header text-center">Step 3</h1>
                <h5 >Do you drink?</h5>
                <p className="fs-xs"><i>This will determine whether the generator will give you cocktails to make yourself or bars in the area!</i></p>
                <div className="step-button-container mt-20">

                    {(type === 'Alc') && <button className="item-btn4-selected mt-10 pad-5" >Yes</button>}
                    {!(type === 'Alc') && <button className="item-btn4 mt-10 pad-5" onClick={replaceAlcButton}>Yes</button>}

                    {(type === 'NA') && <button className="item-btn4-selected mt-10 pad-5">No</button>}
                    {!(type === 'NA') && <button className="item-btn4 mt-10 pad-5" onClick={replaceNAButton}>No</button>}
                </div>
                <div className="step-button-container2 mt-20">
                    <button className="item-btn" onClick={handlePreviousStep}>Prev</button>
                    <button className="item-btn" onClick={handleNextStep}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default StepThree;