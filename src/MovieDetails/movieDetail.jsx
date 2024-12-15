import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DataQuery from '../common/dataQuery';
import './MovieDetailCss/movieDetail.css'
import Fetcher from '../mainPageComponents/searchBar';
import CircularProgress from '@mui/material/CircularProgress';

const MovieDetail = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const detailGoHome = () => {
        navigate('/');
    };

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const result = await DataQuery.fetchMovieDetail(movieId);
                setMovie(result.data.title);
            } catch (err) {
                setError(err.message || "Failed to fetch movie details.");
            } finally {
                setLoading(false);
            }
        };



        fetchMovieDetail();
    }, [movieId]);

    if (loading) {
        return <div className='loadingMassage'><CircularProgress />  </div>;
    }

    if (error) {  
        return <div>Error: {error}</div>;
    }

    if (!movie) {
        return <div>No movie found.</div>;
    }
    const runtimeMinutes = movie.runtime ? movie.runtime.seconds / 60 : "N/A";
    const releaseYear = movie.releaseYear ? movie.releaseYear.year : "N/A";
    const descriptionText = movie.alternateVersions?.edges.length > 0   
    ? movie.alternateVersions.edges[0].node.text.plainText   
    : 'None';

    return (
        <div>
            <Fetcher />
            <div
            className='all-movieDetail'
            style={{ backgroundImage: `url(${movie.primaryImage?.url})` }}
            >
                <div className='DetailImage'>
                    <img src={movie.primaryImage?.url} alt="image" />
                </div>
                <div className='DetailDescription'>
                    <h1 className='D-Title'>{movie.titleText?.text || "Title not available"}</h1>
                    <div className='D-YearAndTime'>
                        <p>Release Year: {releaseYear}</p>
                        <p className='D-Time'>{runtimeMinutes} Minutes</p>
                    </div>
                    <p className='D-MadeBy'>Made By: {movie.releaseDate?.country?.id || "Unknown"}</p>
                    <p className='D-Description'>
                        <span>Description:</span> {descriptionText}
                    </p>
                </div>
                <div>
                <button onClick={detailGoHome} className='detailPageHomeButton'>
                    Go to Main Page
                </button>
            </div>
            </div>
            <div className='downloadBox'>
                <div className='detailDownloadTitleHolder'>
                    <p>Download Box</p>
                </div>
                <div className='watchOnlineButtonDiv'>
                    <button className='watchOnlineButton'>Watch it online</button>
                    <h2>Web Online-4K</h2>
                </div>
                <div className='downloadNowButtonDiv'>
                    <button className='downloadNowButton'>Download now</button>
                    <h2>Web Dl-4K</h2>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;