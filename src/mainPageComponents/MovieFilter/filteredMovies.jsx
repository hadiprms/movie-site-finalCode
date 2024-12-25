import React, { useEffect, useState } from 'react';  
import { Link } from 'react-router-dom';  
import DataQuery from '../../common/dataQuery';


const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [displayCount, setDisplayCount] = useState(21);
    const [watchlist, setWatchlist] = useState(JSON.parse(localStorage.getItem('watchlist')) || []);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [showMovies, setShowMovies] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility  

    const genres = ['Action', 'Drama', 'Comedy', 'Horror', 'Thriller', 'Romance']; // Define genres  

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const result = await DataQuery.fetchTopRatedMovies(42);
                setMovies(result.data.movies.edges);
            } catch (err) {
                setError(err.message || "Failed to fetch movies.");
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    const toggleMovieInWatchlist = (movieId) => {
        const updatedWatchlist = watchlist.includes(movieId)
            ? watchlist.filter(id => id !== movieId)
            : [...watchlist, movieId];
            
        setWatchlist(updatedWatchlist);
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    };

    // Load more movies by increasing the display count
    const loadMoreMovies = () => {
        setDisplayCount(prevCount => prevCount + 21);
    };

    const isMovieInWatchlist = (movieId) => {
        return watchlist.includes(movieId);
    };

    // Function to filter movies by genre  
    const filterMoviesByGenre = (movies, genre) => {
        return genre ? movies.filter(movie => movie.node.titleGenres.genres.some(g => g.genre.text === genre)) : movies;
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Filter movies based on the selected genre  
    const filteredMovies = filterMoviesByGenre(movies, selectedGenre);

    return (
        <div className='All-moviesReturn'>
            <h1 className='titleHolder'>Most popular this week:</h1>

            {/* Main dropdown for genre selection */}
            <div
                className='genre-dropdown'   
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)} // Close dropdown when mouse leaves  
            >  
                <button className="main-genre-button">
                    Select Genre
                </button>
                {isDropdownOpen && ( // Render dropdown only when open  
                    <div className="genre-options">
                        {genres.map((genre) => (
                            <button
                                key={genre}
                                onClick={() => {
                                    setSelectedGenre(genre); // Set selected genre  
                                    setShowMovies(true); // Show movies when genre is selected  
                                    setIsDropdownOpen(false); // Close dropdown after selection  
                                }}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className='element'>
                {showMovies && filteredMovies.slice(0, displayCount).map((movie) => {
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
                                    <p className='movieTitleText'>{movie.node.titleText.text}</p>
                                    <p>
                                        <span className='releaseYearOfMovies'>{movie.node.releaseYear.year} | </span>
                                        <span className='ratingOfMovies'>{movie.node.ratingsSummary.aggregateRating ?? '-'} /10</span>
                                    </p>
                                </div>
                            </Link>
                            <button className='ButtonRemove'
                                type='button'
                                onClick={() => toggleMovieInWatchlist(movieId)}
                                style={{ backgroundColor: isMovieInWatchlist(movieId) ? 'red' : undefined }}
                            >
                                {isMovieInWatchlist(movieId) ? 'Remove Watchlist' : 'Add to Watchlist'}
                            </button>
                        </div>
                    );
                })}
            </div>
            {showMovies && filteredMovies.length > displayCount && (
                <button className='addMoreButton' onClick={loadMoreMovies}>Load More</button>
            )}
        </div>
    );
};

export default MovieList;