import React from 'react';
import { Spring } from 'react-spring/renderprops';
import AuthApiService from '../../services/auth-api-service';
import DRContext from '../../context/DRContext';

class Signup extends React.Component {
    static contextType = DRContext;

    constructor(props) {
        super(props);
        this.password = React.createRef();
        this.state = {
            error: null,
            userNameError: null,
            emailError: null,
            passwordError: null,
            repeatPasswordError: null
        }
    }

    handleRegistrationSubmit = (event) => {
        event.preventDefault();
        const { user_name, email, password, repeat_password } = event.target;
        const date_created = new Date();

        this.setState({ error: null })

        AuthApiService.postUser({
            user_name: user_name.value,
            password: password.value,
            email: email.value,
            date_created: date_created
        })
            .then(user => {
                user_name.value = '';
                password.value = '';
                email.value = '';
                repeat_password.value = '';
                // this.props.onRegistrationSuccess();
                this.context.toggleLanding();
            })
            .catch(res => {
                this.setState({
                    error: res.error
                })
            })
    }

    handleUserNameError = (event) => {
        let userName = event.target.value;

        if (userName.length === 0) {
            this.setState({
                passwordError: null
            })
        }

        if (userName.length < 3) {
            this.setState({
                userNameError: "Username must be at least 3 characters",

            })
        } else {
            this.setState({
                userNameError: null
            })
        }
    }

    handlePasswordError = (event) => {
        let password = event.target.value;
        const regexp_password = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

        if (password.length === 0) {
            this.setState({
                passwordError: null
            })
        }

        if (password.length < 8) {
            this.setState({
                passwordError: 'Password must be longer than 8 characters'
            })
        }
        if (password.length > 72) {
            this.setState({
                passwordError: 'Password must be shorter than 72 characters'
            })
            return
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            this.setState({
                passwordError: `Password must not start or end with empty spaces`
            })
        }
        if (!regexp_password.test(password)) {
            this.setState({
                passwordError: `Password must contain 1 upper case, lower case, number, and special character`
            })
        } else {
            this.setState({
                passwordError: null
            })
        }
    }

    handleRepeatPasswordError = (event) => {
        const repeatPassword = event.target.value;


        if (repeatPassword.length === 0) {
            this.setState({
                passwordError: null
            })
        }

        if (repeatPassword !== this.password.current.value) {
            this.setState({
                repeatPasswordError: `Does not match`
            })
        } else {
            this.setState({
                repeatPasswordError: null
            })
        }
    }

    handleEmailError = (event) => {
        const email = event.target.value
        // const regexp_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regexp_email = /@/

        if (email.length === 0) {
            this.setState({
                emailError: null
            })
        }
        if (!regexp_email.test(email)) {
            this.setState({
                emailError: `Invalid email`
            })
        } else {
            this.setState({
                emailError: null
            })
        }

    }

    toggleLanding = () => {
        this.context.toggleLanding();
        this.setState({
            error: null
        })
    }

    render() {
        const { error, userNameError, emailError, passwordError, repeatPasswordError } = this.state;

        return (
            <>
                <div className="container">
                    <div className="form-box-ls center">
                        <div className="login-box center">
                            <form className="main-form" onSubmit={this.handleRegistrationSubmit}>

                                <div className="form-header-container">
                                    
                                        {error && <p className='alert error'>{error}</p>}

                                    <h1>Sign up</h1>
                                </div>


                                <input
                                    placeholder="Enter user name"
                                    type="text"
                                    name="user_name"
                                    id="user_name"
                                    className="text-input"
                                    maxlength="25"
                                    onBlur={this.handleUserNameError}
                                    required
                                />
                                {userNameError && <p className='error text-right'>{userNameError}</p>}
                                <input
                                    placeholder="Enter email"
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="text-input"
                                    maxlength="25"
                                    onBlur={this.handleEmailError}
                                    required
                                />
                                {emailError && <p className='error text-right'>{emailError}</p>}
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter password"
                                    className="text-input"
                                    maxlength="35"
                                    onBlur={this.handlePasswordError}
                                    ref={this.password}
                                    required
                                />
                                {passwordError && <p className='error text-right'>{passwordError}</p>}

                                <input
                                    type="password"
                                    name="repeat_password"
                                    id="repeat_password"
                                    placeholder="Confirm password"
                                    className="text-input"
                                    maxlength="35"
                                    onBlur={this.handleRepeatPasswordError}
                                    required
                                />
                                {repeatPasswordError && <p className='error text-right'>{repeatPasswordError}</p>}

                                <div className="form-button-container">
                                    <button type="submit" className="item-btn">Register</button>
                                </div>

                            </form>

                            <p>Already have an account? {' '}
                                <span className="landing-link" onClick={this.toggleLanding}>Log in!</span>
                            </p>



                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Signup;