import React from 'react';
import './App.css';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Header from './components/Header/Header';

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
    if(tokenBool) {
      document.body.classList.add('body-pos-home');
    }
    console.log(tokenBool);
    let showReg = !this.context.login;
    let showLogin = this.context.login;

    return (
      <div className="App">
        <main>
          {tokenBool && <div><Header /></div>}
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
