import React, { useEffect, useState } from 'react';  
import { Link } from 'react-router-dom';
import './cssFiles/MovieSlider.css';  
import Fetcher from './searchBar';

const MovieSlider = ({ movies }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {  
        const interval = setInterval(() => {  
            setCurrentIndex((prevIndex) => (prevIndex + 1) % (movies.length || 1));  
        }, 3000); // Change movie every 3 seconds  
        return () => clearInterval(interval);  
    }, [movies.length]);  

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const displayedMovies = [  
        ...movies.slice(currentIndex, currentIndex + 4),  
        ...movies.slice(0, Math.max(0, 4 - (movies.length - currentIndex)))  
    ].slice(0, 4);

    return (
        <div className='All-Slider' style={{
            backgroundImage: windowWidth > 899 ? `url(${movies[currentIndex].node.primaryImage.url})` : 'none'
        }}>
            <Fetcher />
            <h1 className='sliderMobileTitle'>You might like:</h1>
            <div className='allSliderDiv'>
                <div className='sliderContainer'>
                    {displayedMovies.map((movie, index) => (  
                        <div key={movie.node.id} className='sliderElement' style={{  
                            left: window.innerWidth >= 900 ? `${index * 25}%` : undefined,  
                            right: window.innerWidth < 900 ? `${index * 80}%` : undefined,  
                        }}>  
                            <div className='rightAndLeftSide'>  
                                <div className='right-side'>  
                                    <div className='sliderImage-container'>
                                        <Link to={`/movie/${movie.node.id}`}>
                                            {movie.node.primaryImage && (
                                                <img
                                                    src={movie.node.primaryImage.url}
                                                    alt={movie.node.primaryImage.url}
                                                    className='sliderMovie-image'
                                                />
                                            )}
                                        </Link>
                                    </div>
                                </div>  
                            </div>  
                        </div>  
                    ))}  
                </div>  
                {/* Title and Rating Section on the right side */}  
                <div className='titleContainer'>  
                    {displayedMovies.length > 0 && (  
                        <div className='sliderInfoHolder'>  
                            <p className='sliderTitleText' style={{ textAlign: 'center' }}>{displayedMovies[0].node.titleText.text}</p>
                            <p style={{ textAlign: 'center' }}>
                                {displayedMovies[0].node.releaseYear.year} |
                                <span className='ratingOfSlider'> {displayedMovies[0].node.ratingsSummary.aggregateRating ?? '-'} /10</span>  
                            </p>
                        </div>  
                    )}  
                </div>
            </div>
        </div>  
    );
};  

export default MovieSlider;