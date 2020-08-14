import React from 'react'
import TokenService from '../services/token-service';

const DRContext = React.createContext({

});

export default DRContext;

export class DRContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            intro: true,
            location: null,
            latLng: null,
            places: [],

        }

        const jwtPayload = TokenService.parseAuthToken()

        if (jwtPayload) {
            this.state.user = {
                user_id: jwtPayload.userId,
                email: jwtPayload.email,
                user_name: jwtPayload.sub
            }
        }
    }

    toggleLanding = () => {
        this.setState({
            login: !this.state.login
        })
    }

    toggleIntro = (bool) => {
        this.setState({
            intro: bool
        })
    }

    handleSetLocation = (latLng, location) => {
        this.setState({
            latLng,
            location
        })
    }

    handleSetPlaces = (places) => {
        this.setState({
            places
        })
    }

    render() {
        const value = {
            ...this.state,
            toggleLanding: this.toggleLanding,
            toggleIntro: this.toggleIntro,
            handleSetLocation: this.handleSetLocation,
            handleSetPlaces: this.handleSetPlaces,
        }

        return (
            <DRContext.Provider value={value}>
                {this.props.children}
            </DRContext.Provider>
        )
    }
}