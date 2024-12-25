import React, { useEffect, useState } from 'react';
import DataQuery from '../common/dataQuery';
import { Link } from 'react-router-dom';
import './watchListCss/watchList.css';
import { useFavoriteMovies } from '../mainPageComponents/FavoriteMoviesContext';
import CircularProgress from '@mui/material/CircularProgress';

const WatchlistPage = () => {
    const { state, dispatch } = useFavoriteMovies();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const result = await DataQuery.fetchTopRatedMovies();
                setMovies(result.data.movies.edges);
            } catch (err) {
                console.error("Failed to fetch movies.", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const getMovieDetails = (movieId) => {
        const movie = movies.find(m => m.node.id === movieId);
        return movie ? {
            title: movie.node.titleText.text,
            year: movie.node.releaseYear.year,
            primaryImage: movie.node.primaryImage ? movie.node.primaryImage.url : null,
            rating: movie.node.ratingsSummary.aggregateRating,
        } : null;
    };

    if (loading) {
        return <div className='loadingMassage'><CircularProgress />  </div>;
    }

    return (
        <>
            <h1 className='watchListTitle' style={{ color: 'white' }}>Your Favorites</h1>
            <div className="watchlist-container">
                {state.favorites.length === 0 ? (
                    <p className='epmtyWatchList'>Your favorites list is empty. Start adding movies!</p>
                ) : (
                    <ul>
                        {state.favorites.map((movieId) => {
                            const movieDetails = getMovieDetails(movieId);
                            return movieDetails ? (
                                <div className='AllMoviesInfo' key={movieId}>
                                    <div className='test'>
                                        <Link to={`/movie/${movieId}`}>
                                            {movieDetails.primaryImage && (
                                                <img src={movieDetails.primaryImage} alt={movieDetails.title} className='watchListImage' style={{ width: '100px' }} />
                                            )}
                                            <h3 className='watchlistMovieTitle' style={{ color: 'white' }}>{movieDetails.title}</h3>
                                        </Link>
                                        <button className='removeButton' onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch({ type: 'REMOVE_FAVORITE', payload: movieId });
                                        }}>Remove from Favorites</button>
                                    </div>
                                </div>
                            ) : null;
                        })}
                    </ul>
                )}
            </div>
        </>
    );
};

export default WatchlistPage;