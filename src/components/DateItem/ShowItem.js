import React from 'react';
import { useState } from 'react';

const ShowItem = (props) => {

    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    }

    let genres = 'Horror'
    // let genres = [];
    // if (this.props.movieBool) {
    //     this.props.show.genre_ids.forEach(id => {
    //         let size = this.context.movieGenres.length;
    //         for (let i = 0; i < size; i++) {
    //             if (id === this.context.movieGenres[i].id) {
    //                 genres.push(this.context.movieGenres[i].name);
    //             }
    //         }
    //     })
    // } else {
    //     this.props.show.genre_ids.forEach(id => {
    //         let size = this.context.tvGenres.length;
    //         for (let i = 0; i < size; i++) {
    //             if (id === this.context.tvGenres[i].id) {
    //                 genres.push(this.context.tvGenres[i].name);
    //             }
    //         }
    //     })
    // }

    // genres = genres.join(', ');

    // let title = this.props.show.title;
    let title = 'Up!';
    let type = 'Movie'
    // if(!this.props.show.title){
    //     title = this.props.show.name;
    // type = 'TV Show'
    // }
    return (
        <div className="main-container">
            <div className="border">
                <h3 className="item-header text-center mb-10">{title}</h3>

                <p className="text-center">
                    {/* <img src={`https://image.tmdb.org/t/p/w500/${this.props.show.poster_path}`} className="show-image mb-10" /> */}
                    <img src={`https://via.placeholder.com/500x900`} className="show-image mb-10" />
                </p>

                {!showDetails &&
                    <div className="info" onClick={toggleDetails}>
                        <i class="fas fa-plus-circle"></i>
                    </div>
                }

                {showDetails &&
                    <>
                        <p className="text-center">Type: {type}</p>
                        <p className="text-center">Genre(s): {genres}</p>

                        <div className="divider center mb-20 mt-20"></div>

                        {/* <p className="text-center"> Rating: {this.props.show.vote_average} out of 10</p> */}
                        <p className="text-center"> Rating: 5 out of 10</p>
                        <div className="divider center mb-20 mt-20"></div>

                        {/* <p className="text-justify">{this.props.show.overview}</p> */}
                        <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        <div className="info" onClick={toggleDetails}>
                            <i class="fas fa-minus-circle"></i>
                        </div>
                    </>
                }

            </div>




        </div>
    )
}

export default ShowItem;