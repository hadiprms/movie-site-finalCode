import React, { useState } from 'react';

const GenreForm = () => {
    return(
        <>
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
                                </div></>
    )
}
export default GenreForm;