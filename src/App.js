import React from 'react';
import './App.css';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import StepOne from './components/Steps/StepOne';
import StepTwo from './components/Steps/StepTwo';
import StepThree from './components/Steps/StepThree';
import StepFour from './components/Steps/StepFour';
import Results from './components/Results/Results';
import Profile from './components/Profile/Profile';
import BalloonButton from './components/BalloonButton/BalloonButton';

import TokenServices from './services/token-service';
import DRContext from './context/DRContext';
import { Transition } from 'react-spring/renderprops';

class App extends React.Component {
  static contextType = DRContext;

  constructor(props) {
    super(props);
  }

  render() {
    let tokenBool = TokenServices.hasAuthToken();
    let showReg = !this.context.login;
    let showLogin = this.context.login;

    if(tokenBool) {
      document.body.classList.add('body-pos-home');
    }

    console.log(this.context.latLng);
    console.log(this.context.location);

    return (
      <div className="App">
        <main>
          
          {tokenBool && <div><Header /></div>}

          {/* {tokenBool && <Profile />} */}

          {tokenBool && (this.context.step === 5) && <Results />}

          <div className="main-step-container">
            {tokenBool && (this.context.step === 4) && <StepFour />}
            {tokenBool && (this.context.step === 3) && <StepThree />}
            {tokenBool && (this.context.step === 2) && <StepTwo />}
            {tokenBool && (this.context.step === 1) && <StepOne />}
            {tokenBool && (this.context.step === 0) && <Home />}
            <BalloonButton />
          </div>

          {!this.context.login && !tokenBool &&
            <Transition
              items={showReg}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0, }}
            >
              {showReg => showReg && (props =>
                <div style={props}>
                  <Signup />
                </div>
              )}
            </Transition>

          }
          {this.context.login && !tokenBool &&
            <Transition
              items={showLogin}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0, }}
            >
              {showLogin => showLogin && (props =>
                <div style={props}>
                  <Login />
                </div>
              )}
            </Transition>

          }
        </main>
      </div>
    );
  }

}

export default App;
