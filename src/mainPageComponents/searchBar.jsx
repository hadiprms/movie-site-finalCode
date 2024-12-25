import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { searchMoviesFetch } from "../common/searchDataQuery";
import './cssFiles/searchBar.css';

const Fetcher = () => {  
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const searchRef = useRef(null);

    const fetchData = async (searchQuery) => {
        if (!searchQuery) {
            setData([]);
            setShowResults(false);
            return;
        }

        setIsLoading(true);
        try {
            const result = await searchMoviesFetch(searchQuery);
            setData(result);
            setShowResults(result.length > 0);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            fetchData(query);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
                setQuery("");
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleWatchlistClick = () => {
        window.open('/watchlist', '_blank', 'noopener,noreferrer');
    };

    return (
        <div style={{ position: 'relative' }} ref={searchRef}>
            <div className="siteNameAndInput">
                <div className="siteName">
                    <Link to="/">
                        <p>Best <span>Movies</span><img src="https://img.icons8.com/?size=100&id=11139&format=png&color=FD7E14" alt="image" /></p>
                    </Link>
                </div>
                <div className="watchlistButton">
                    <button onClick={handleWatchlistClick}>View Watchlist</button>
                </div>
                <div className="searchBar-inputAndButton">
                    <input  
                        type="text"  
                        value={query}  
                        onChange={(e) => setQuery(e.target.value)}  
                        placeholder="Search for a movie..."  
                    />  
                    <button onClick={() => fetchData(query)} disabled={!query}>Search</button>
                </div>
            </div>
            {showResults && (
                <ul className="searchResult"> 
                    {isLoading ? ( 
                        <li className="loadingMessage" style={{ textAlign: 'center' , color: 'white'}}>Loading...</li>
                    ) : (
                        data.slice(0, 4).map((movie) => (
                            <li key={movie.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px' }}>
                                <Link to={`/movie/${movie.id}`}>
                                    <div className="searchResult-Info">
                                        {movie.i && <img src={movie.i.imageUrl} alt={movie.l} style={{ width: '100px', marginBottom: '10px' }} />}
                                        <span style={{ textAlign: 'center' }}>{movie.l}</span>
                                    </div>
                                </Link>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>  
    );
};  

export default Fetcher;