import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';  
import './cssFiles/MostPopularMovies.css';  
import { favoriteMoviesReducer, initialState } from './favoriteMoviesReducer';

const TopRatedMovies = ({ movies }) => {
    const [state, dispatch] = useReducer(favoriteMoviesReducer, initialState);
    const [displayCount, setDisplayCount] = useState(21);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [genres, setGenres] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const uniqueGenres = new Set();
        movies.forEach(movie => {
            movie.node.titleGenres.genres.forEach(g => uniqueGenres.add(g.genre.text));
        });
        setGenres(Array.from(uniqueGenres));
    }, [movies]);

    const toggleMovieInFavorites = (movieId) => {
        if (state.favorites.includes(movieId)) {
            dispatch({ type: 'REMOVE_FAVORITE', payload: movieId });
        } else {
            dispatch({ type: 'ADD_FAVORITE', payload: movieId });
        }
    };

    const filteredMovies = selectedGenre
        ? movies.filter(movie => movie.node.titleGenres.genres.some(g => g.genre.text === selectedGenre))
        : movies;

    return (
        <div className='All-moviesReturn'>
            <div className='titleHolder'>
                <h2 style={{ marginBottom: '1%' }}>Most popular this week:</h2>

                {/* Single button for dropdown genre selection */}  
                <div
                    className="genre-dropdown"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                >
                    <button className="main-genre-button">
                        {selectedGenre || 'Select Genre'}
                    </button>
                    {isDropdownOpen && (
                        <div className="genre-options">
                            {genres.map((genre) => (
                                <button
                                    key={genre}
                                    onClick={() => {
                                        setSelectedGenre(genre);
                                        setIsDropdownOpen(false); // Close dropdown after selection  
                                    }}
                                    className={'genre-button'}
                                >
                                    {genre}
                                </button>
                            ))}
                            <button
                                className='genre-button'
                                onClick={() => {
                                    setSelectedGenre('');
                                    setIsDropdownOpen(false); // Close dropdown after reset  
                                }}
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className='element'>
                {filteredMovies.slice(0, displayCount).map((movie) => {
                    const movieId = movie.node.id;
                    return (
                        <div className='element-div' key={movieId}>
                            <Link to={`/movie/${movieId}`} className='media'>
                                <div className='image-container'>
                                    {movie.node.primaryImage && <img src={movie.node.primaryImage.url} alt={movie.node.primaryImage.url} className='movie-image' />}  
                                    <div className='overlay'>
                                        {movie.node.titleGenres.genres.slice(0, 1).map((gTitle) => (
                                            <div key={gTitle.genre.text}>
                                                <p>{gTitle.genre.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='movieInfoHolder'>
                                    <p className='movieTitleText' data-testid={`movie-title-${movie.node.id}`}>{movie.node.titleText.text}</p>
                                    <p>
                                        <span className='releaseYearOfMovies'>{movie.node.releaseYear.year} | </span>
                                        <span className='ratingOfMovies'>{movie.node.ratingsSummary.aggregateRating ?? '-'} /10</span>
                                    </p>
                                </div>
                            </Link>
                            <button className='ButtonRemove'
                                type='button'
                                data-testid={`favorite-button-${movieId}`}
                                onClick={() => toggleMovieInFavorites(movieId)}
                                style={{ backgroundColor: state.favorites.includes(movieId) ? 'red' : undefined }}
                            >
                                {state.favorites.includes(movieId) ? 'Remove from Favorites' : 'Add to Favorites'}
                            </button>
                        </div>
                    );
                })}
            </div>
            {filteredMovies.length > displayCount && (
                <button className='addMoreButton' onClick={() => setDisplayCount(prevCount => prevCount + 21)}>Load More</button>
            )}
        </div>  
    );  
};  

export default TopRatedMovies;