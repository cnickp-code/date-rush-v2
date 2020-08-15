import React from 'react';
import { useState, useContext } from 'react';
import DRContext from '../../context/DRContext';

const StepTwo = () => {

    const [type, setDateType] = useState(null);
    const { handleSetStep } = useContext(DRContext);

    const replaceInButton = () => {
        setDateType(null);
        setTimeout(() => {
            setDateType('In');
        }, 400);
    }

    const replaceOutButton = () => {
        setDateType(null);
        setTimeout(() => {
            setDateType('Out');
        }, 400);
    }

    const handlePreviousStep = () => {
        document.body.classList.remove('body-pos-step2');
        document.body.classList.add('body-pos-step1');
        handleSetStep(1);
    }

    const handleNextStep = () => {
        document.body.classList.remove('body-pos-step2');
        document.body.classList.add('body-pos-step3');
        handleSetStep(3);
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
                {!(type === 'Out') && <button className="item-btn3 mt-10 pad-5"onClick={replaceOutButton}>Going Out</button>}
            </div>

            <div className="step-button-container2 mt-20">
                <button className="item-btn" onClick={handlePreviousStep}>Prev</button>
                <button className="item-btn" onClick={handleNextStep}>Next</button>
            </div>
            </div>
        </div>
    )
}

export default StepTwo;