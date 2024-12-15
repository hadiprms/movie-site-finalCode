import React, { useEffect, useState } from 'react';
import DataQuery from '../../common/dataQuery';
import TopRatedMovies from '../MostPopularMovies';
import MovieSlider from '../movieSlider';
import Footer from '../footer';
import CircularProgress from '@mui/material/CircularProgress';

const MainPageFetchCall = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const result = await DataQuery.fetchTopRatedMovies(42); // Fetch more if needed for TopRatedMovies  
                setMovies(result.data.movies.edges);
            } catch (err) {
                setError(err.message || "Failed to fetch movies.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) {
        return <div style={{color: 'white'}}>
            <div className='loadingMassage'><CircularProgress />  </div>
        </div>
    }

    if (error) {
        return <div></div>;
    }

    return (
        <div>
            <MovieSlider movies={movies} />
            <TopRatedMovies movies={movies} loading={loading}/>
            <Footer />
        </div>
    );
};

export default MainPageFetchCall;