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
import LogoutOverlay from './components/Overlays/LogoutOverlay';
import SaveDateOverlay from './components/Overlays/SaveDateOverlay';

import DateRushApiService from './services/dr-api-service';
import ExtApiService from './services/external-api-service';
import TokenServices from './services/token-service';
import DRContext from './context/DRContext';
import { Spring, Transition } from 'react-spring/renderprops';

class App extends React.Component {
  static contextType = DRContext;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    ExtApiService.getAlcDrinks()
      .then(drinks => {
        this.context.handleSetInitialDrink(drinks.drinks[0])
      })

    ExtApiService.getMovieGenres()
      .then(results => {
        this.context.handleSetMovieGenres(results.genres);
      })

    ExtApiService.getTvGenres()
      .then(results => {
        this.context.handleSetTVGenres(results.genres);
      })

    DateRushApiService.getDates()
      .then(results => {
        console.log('my dates ', results)
        this.context.handleSetMyDates(results);
      })
  }

  render() {
    let tokenBool = TokenServices.hasAuthToken();
    let showReg = !this.context.login;
    let showLogin = this.context.login;

    if (tokenBool) {
      document.body.classList.add('body-pos-home');
    }

    console.log('-------------------------------');
    console.log(this.context.login);
    // console.log('LATLNG', this.context.latLng);
    // console.log('Location', this.context.location);
    // console.log('DateType', this.context.dateType);
    // console.log('Step: ', this.context.step);
    // console.log('RESTAURANTS', this.context.restaurants);
    // console.log('ACTIVITY', this.context.activity);
    // console.log('RESTAURANT', this.context.restaurant);
    // console.log('MEAL', this.context.meal);
    console.log('DRINK', this.context.drink);
    console.log('DRINK TYPE', this.context.drinkType);
    console.log('MEAL TYPE', this.context.mealType)
    console.log('CAFES', this.context.cafes)
    console.log('CAFE', this.context.cafe)
    console.log('BARS', this.context.bars)
    console.log('BAR', this.context.bar)
    // console.log('SHOW', this.context.show)
    // console.log('GENRES', this.context.movieGenres);

    // $(function () {
    //   var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    //   var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    //   $("html, body").css({ "width": w, "height": h });
    // });

    return (
      <div className="App">
        <main>
          {this.context.saveBool && <SaveDateOverlay />}
          {this.context.logoutBool && <LogoutOverlay />}

          {tokenBool && <div><Header /></div>}

          {tokenBool && (this.context.step === 6) &&
            <>
              <Spring
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
                config={{ delay: 250, duration: 1000 }}
              >
                {props => (
                  <div style={props} >
                    <Profile />
                  </div>
                )}
              </Spring>
            </>
          }

          {tokenBool && (this.context.step === 5) &&
            <>
              <Spring
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
                config={{ delay: 250, duration: 1000 }}
              >
                {props => (
                  <div style={props} >
                    <Results />
                  </div>
                )}
              </Spring>
            </>
          }

          {tokenBool && !(this.context.step === 5 || this.context.step === 6) &&
            <div className="main-step-container">
              {tokenBool && (this.context.step === 4) && <StepFour />}
              {tokenBool && (this.context.step === 3) && <StepThree />}
              {tokenBool && (this.context.step === 2) && <StepTwo />}
              {tokenBool && (this.context.step === 1) && <StepOne />}
              {tokenBool && (this.context.step === 0) &&
                <>
                  <Spring
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                    config={{ delay: 1000, duration: 1000 }}
                  >
                    {props => (
                      <div style={props} >
                        <Home />
                      </div>
                    )}
                  </Spring>
                </>
              }
              {this.context.buildBool && <BalloonButton />}
            </div>}

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
