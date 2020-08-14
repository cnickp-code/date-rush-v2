import React from 'react';
import { useState, useContext } from 'react';

const StepTwo = () => {

    const [type, setDateType] = useState(null);

    const replaceInButton = () => {
        setDateType(null);
        setTimeout(() => {
            setDateType('In');
        }, 1000);
    }

    const replaceOutButton = () => {
        setDateType(null);
        setTimeout(() => {
            setDateType('Out');
        }, 1000);
    }



    return (
        <div className="step-container">
            <h1 className="mb-10 step-header">Step 2</h1>
            <h5 >Staying in or going out?</h5>
            <div className="step-button-container mt-20">

                {(type === 'In') && <button className="item-btn-selected mt-10 pad-5" >Staying In</button>}
                {!(type === 'In') && <button className="item-btn3 mt-10 pad-5" onClick={replaceInButton}>Staying In</button>}

                {(type === 'Out') && <button className="item-btn-selected mt-10 pad-5">Going Out</button>}
                {!(type === 'Out') && <button className="item-btn3 mt-10 pad-5"onClick={replaceOutButton}>Going Out</button>}
            </div>
        </div>
    )
}

export default StepTwo;