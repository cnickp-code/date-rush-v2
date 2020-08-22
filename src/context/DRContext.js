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
            cafes: [],
            bars: [],
            restaurants: [],
            step: 0,
            buildBool: false,
            showNext: false,
            movieBool: null,
            movieGenres: null,
            tvGenres: null,
            myDates: [],
            summaryDate: null,
            summaryBool: false,
            logoutBool: false,
            saveBool: false,

            location: null,
            dateType: null,
            mealType: null,
            showType: null,
            show: null,
            activity: null,
            meal: null,
            restaurant: null,
            drink: null,
            drinkType: null,
            cafe: null,
            bar: null,
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

    handleSetDrinkPlace = (type) => {
        if(type === 'Alc') {
            const randIndex = Math.floor(Math.random() * Math.floor(this.state.bars.length - 1));
            const bar = this.state.bars[randIndex];

            this.setState({
                drinkType: type,
                bar
            })
        } else if(type === 'NA') {
            const randIndex = Math.floor(Math.random() * Math.floor(this.state.cafes.length - 1));
            const cafe = this.state.cafes[randIndex];

            this.setState({
                drinkType: type,
                cafe
            })
        }

    }

    setCafes = (cafes) => {
        let newCafes = cafes.filter(cafe => cafe.name !== `McDonald's`)

        this.setState({
            cafes: newCafes
        })
    }

    setBars = (bars) => {
        this.setState({
            bars
        })
    }
    
    handleAddProfileDates = (item) => {
        let newDates = [...this.state.myDates, item]

        this.setState({
            myDates: newDates
        })
    }

    handleReset = () => {
        this.setState({
            location: null,
            dateType: null,
            mealType: null,
            showType: null,
            show: null,
            activity: null,
            meal: null,
            restaurant: null,
            drink: null,
        })
    }

    toggleSaveBool = (bool) => {
        this.setState({
            logoutBool: false,
            saveBool: bool
        })
    }

    toggleLogoutBool = (bool) => {
        this.setState({
            saveBool: false,
            logoutBool: bool
        })
    }

    handleSetSummaryDate = (date) => {
        this.setState({
            summaryDate: date
        })
    }
    
    handleSetSummaryBool = (bool) => {
        this.setState({
            summaryBool: bool
        })
    }

    handleDeleteDateItem = (id) => {
        let newDateItems = this.state.myDates.filter(item => item.id !== id);

        this.setState({
            myDates: newDateItems
        })
    }

    handleSetMyDates = (dates) => {
        this.setState({
            myDates: dates
        })
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
            // this.setState({
            //     buildBool: false
            // })
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

    handleSetOnlyLocation = (location) => {
        this.setState({
            location
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
        if(type === 'Movie') {
            this.setState({
                movieBool: true,
                showType: type
            })
        } else if(type === 'TV') {
            this.setState({
                movieBool: false,
                showType: type
            })
        }

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

    findNonAlcDrinks = () => {
        ExtApiService.getAlcDrinks()
        .then(drinks => {
            if(drinks.drinks[0].strAlcoholic === 'Non alcoholic') {
                this.setState({
                    drinkType: 'NA',
                    drink: drinks.drinks[0],
                })
            } else {
                this.findNonAlcDrinks();
            }
        })
    }

    findAlcDrinks = () => {
        ExtApiService.getAlcDrinks()
        .then(drinks => {
            if(drinks.drinks[0].strAlcoholic === 'Alcoholic') {
                this.setState({
                    drinkType: 'Alc',
                    drink: drinks.drinks[0],
                })
            } else {
                this.findAlcDrinks();
            }
        })
    }

    handleSetDrink = (type) => {
        if (type === 'Alc') {
            this.findAlcDrinks();
        } else if (type === 'NA') {
            this.findNonAlcDrinks();
        }
    }

    handleSetInitialDrink = (drink) => {
        this.setState({
            drink
        })
    }

    handleSetSummaryMeal = (meal) => {
        this.setState({
            meal
        })
    }

    handleSetSummaryRestaurant = (restaurant) => {
        this.setState({
            restaurant
        })
    }

    handleSetMealType = (type) => {
        this.setState({
            mealType: type
        })
    }

    handleSetDrinkTypeOnly = (type) => {
        this.setState({
            drinkType: type
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
            this.setState({
                mealType: 'Out'
            })
            this.setRestaurants();
        }


    }

    handleSetRandomRestaurant = () => {
        const randIndex = Math.floor(Math.random() * Math.floor(this.state.restaurants.length - 1));
        const restaurant = this.state.restaurants[randIndex];

        this.setState({
            restaurant: restaurant.restaurant
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

    handleSetSummaryActivity = (activity) => {
        this.setState({
            activity
        })
    }

    handleSetSummaryDrink = (drink) => {
        this.setState({
            drink
        })
    }

    handleSetSummaryShow = (show) => {
        this.setState({
            show
        })
    }

    handleSetSummaryDrinkPlace = (place) => {
        this.setState({
            drink: place
        })
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
            handleSetTVGenres: this.handleSetTVGenres,
            handleSetMyDates: this.handleSetMyDates,
            handleDeleteDateItem: this.handleDeleteDateItem,
            handleSetOnlyLocation: this.handleSetOnlyLocation,
            handleSetSummaryActivity: this.handleSetSummaryActivity,
            handleSetSummaryMeal: this.handleSetSummaryMeal,
            handleSetSummaryRestaurant: this.handleSetSummaryRestaurant,
            handleSetSummaryDrink: this.handleSetSummaryDrink,
            handleSetSummaryShow: this.handleSetSummaryShow,
            handleSetMealType: this.handleSetMealType,
            handleSetSummaryBool: this.handleSetSummaryBool,
            handleSetSummaryDate: this.handleSetSummaryDate,
            toggleLogoutBool: this.toggleLogoutBool,
            toggleSaveBool: this.toggleSaveBool,
            handleReset: this.handleReset,
            handleAddProfileDates: this.handleAddProfileDates,
            setCafes: this.setCafes,
            setBars: this.setBars,
            handleSetDrinkPlace: this.handleSetDrinkPlace,
            handleSetDrinkTypeOnly: this.handleSetDrinkTypeOnly,
            handleSetSummaryDrinkPlace: this.handleSetSummaryDrinkPlace
            
        }

        return (
            <DRContext.Provider value={value}>
                {this.props.children}
            </DRContext.Provider>
        )
    }
}