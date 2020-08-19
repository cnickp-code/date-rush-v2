import React from 'react'
import TokenService from '../services/token-service';
import ExtApiService from '../services/external-api-service';

const DRContext = React.createContext({

});

export default DRContext;

export class DRContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            intro: true,
            latLng: null,
            places: [],
            restaurants: [],
            step: 0,
            buildBool: false,
            showNext: false,
            movieBool: null,
            movieGenres: null,
            tvGenres: null,

            location: null,
            dateType: null,
            showType: null,
            show: null,
            activity: null,
            meal: null,
            restaurant: null,
            drink: null,
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

    handleSetShowType = (type) => {
        this.setState({
            showType: type
        })
    }

    handleSetShowNext = (bool) => {
        this.setState({
            showNext: bool
        })
    }

    handleSetDateType = (type) => {
        this.setState({
            dateType: type
        })
    }

    handleSetStep = (step) => {
        if (step === 0) {
            document.body.classList.remove('body-pos-results');
            document.body.classList.remove('body-pos-profile');
            document.body.classList.remove('body-pos-step4');
            document.body.classList.remove('body-pos-step3');
            document.body.classList.remove('body-pos-step2');
            document.body.classList.add('body-pos-home');

            this.setState({
                buildBool: false
            })
        } else if (step === 1) {
            document.body.classList.remove('body-pos-step2');
            document.body.classList.add('body-pos-home');
        } else if (step === 2) {
            document.body.classList.remove('body-pos-home');
            document.body.classList.remove('body-pos-step3');
            document.body.classList.add('body-pos-step2');
        } else if (step === 3) {
            document.body.classList.remove('body-pos-step2');
            document.body.classList.remove('body-pos-step4');
            document.body.classList.add('body-pos-step3');
        } else if (step === 4) {
            document.body.classList.remove('body-pos-step3');
            document.body.classList.remove('body-pos-results');
            document.body.classList.add('body-pos-step4');
        } else if (step === 5) {
            document.body.classList.remove('body-pos-step4');
            document.body.classList.add('body-pos-results');
            this.setState({
                buildBool: false
            })
        } else if (step === 6) {
            document.body.classList.remove('body-pos-results');
            document.body.classList.remove('body-pos-home');
            document.body.classList.remove('body-pos-step4');
            document.body.classList.remove('body-pos-step3');
            document.body.classList.remove('body-pos-step2');
            document.body.classList.add('body-pos-profile');
            this.setState({
                buildBool: false
            })
        }

        this.setState({
            step
        })
    }

    toggleBuildBool = (bool) => {
        this.setState({
            buildBool: bool
        })
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

    handleSetMovieGenres = (genres) => {
        this.setState({
            movieGenres: genres
        })
    }

    handleSetTVGenres = (genres) => {
        this.setState({
            tvGenres: genres
        })
    }

    handleSetShowType = (type) => {
        this.setState({
            showType: type
        })
    }

    handleSetShow = (type) => {
        let start = Math.floor(Math.random() * Math.floor(500));
        let randIndex = Math.floor(Math.random() * Math.floor(20));

        if (type === 'Movie') {
            ExtApiService.getMoviesByPopularity(start)
                .then(movies => {
                    const randMovie = movies.results[randIndex];
                    this.setState({
                        movieBool: true,
                        showType: type,
                        show: randMovie,
                    })
                })
        } else {
            ExtApiService.getTvShowsByPopularity(start)
                .then(shows => {
                    const randShow = shows.results[randIndex];
                    this.setState({
                        movieBool: false,
                        showType: type,
                        show: randShow,
                    })
                })
        }
    }

    handleSetDrink = (type) => {
        if (type === 'Alc') {
            ExtApiService.getAlcDrinks()
                .then(drinks => {
                    this.setState({
                        drink: drinks.drinks[0],
                    })
                })
        } else if (type === 'NA') {
            ExtApiService.getAlcDrinks()
                .then(drinks => {
                    this.setState({
                        drink: drinks.drinks[0],
                    })
                })
        }
    }

    handleSetInitialDrink = (drink) => {
        this.setState({
            drink
        })
    }

    handleSetMeal = (type) => {
        if (type === 'In') {
            ExtApiService.getMeal()
                .then(meal => {
                    this.setState({
                        meal: meal.meals[0]
                    })
                })
        } else if (type === 'Out') {
            this.setRestaurants();
        }


    }

    handleSetRandomRestaurant = () => {
        const randIndex = Math.floor(Math.random() * Math.floor(this.state.restaurants.length - 1));
        const restaurant = this.state.restaurants[randIndex];

        this.setState({
            restaurant
        })
    }

    setRestaurants = () => {
        let i = 0;
        while (i <= 5) {
            ExtApiService.getRestaurantsByLocation(this.state.latLng.lat, this.state.latLng.lng, i, 2000)
                .then(results => {
                    if (this.state.restaurants.length > 0) {
                        this.setState({
                            restaurants: [...this.state.restaurants, ...results.restaurants]
                        }, () => {
                            this.handleSetRandomRestaurant();
                        })
                    } else {
                        this.setState({
                            restaurants: results.restaurants
                        })
                    }

                })
            i++;
        }
    }

    handleSetRandomActivity = () => {
        const randIndex = Math.floor(Math.random() * Math.floor(this.state.places.length - 1));
        const activity = this.state.places[randIndex];

        this.setState({
            activity
        })
    }

    handleSetPlaces = (places) => {
        this.setState({
            places,
        }, () => {
            this.handleSetRandomActivity();
        })
    }

    render() {
        const value = {
            ...this.state,
            toggleLanding: this.toggleLanding,
            toggleIntro: this.toggleIntro,
            handleSetLocation: this.handleSetLocation,
            handleSetPlaces: this.handleSetPlaces,
            handleSetStep: this.handleSetStep,
            toggleBuildBool: this.toggleBuildBool,
            handleSetDateType: this.handleSetDateType,
            handleSetShowNext: this.handleSetShowNext,
            handleSetMeal: this.handleSetMeal,
            handleSetDrink: this.handleSetDrink,
            handleSetInitialDrink: this.handleSetInitialDrink,
            handleSetShowType: this.handleSetShowType,
            handleSetShow: this.handleSetShow,
            handleSetMovieGenres: this.handleSetMovieGenres,
            handleSetTVGenres: this.handleSetTVGenres
        }

        return (
            <DRContext.Provider value={value}>
                {this.props.children}
            </DRContext.Provider>
        )
    }
}