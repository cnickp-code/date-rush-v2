import React from 'react';
import { Spring } from 'react-spring/renderprops';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import DRContext from '../../context/DRContext';

class Login extends React.Component {
    static contextType = DRContext;

    state = {
        error: null
    }

    onLoginSuccess = () => {
        document.body.classList.add('body-pos-home');
        this.context.toggleIntro(false);
    }
    
    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            error: null,
        })

        const { user_name, password } = event.target

        AuthApiService.postLogin({
            user_name: user_name.value,
            password: password.value
        })
            .then(res => {
                user_name.value = '';
                password.value = '';
                TokenService.saveAuthToken(res.authToken);
                this.onLoginSuccess();
            })
            .catch(res => {
                this.setState({ error: res.error })
            })

    }

    toggleLanding = () => {
        this.context.toggleLanding();
    }

    render() {
        const { error } = this.state;

        return (
            <>
                <div className="container">
                    <div className="form-box-ls center">
                        <form className="main-form" onSubmit={this.handleSubmit}>
                            <div role='alert'>
                                {error && <p className='error text-right'>{error}</p>}
                            </div>
                            <h1>Log In</h1>

                            <input
                                placeholder="Enter user name"
                                type="text"
                                name="user_name"
                                id="user_name"
                                className="text-input"
                                onBlur={this.handleUserNameError}
                                required
                            />

                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter password"
                                className="text-input"

                                ref={this.password}
                                required
                            />

                            <div className="form-button-container">
                                <button type="submit" className="item-btn">Submit</button>
                            </div>

                        </form>
                        <div className="login-box center">
                            <p>First time here? {' '}
                                <span className="landing-link" onClick={this.toggleLanding}>Sign up!</span>
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Login;