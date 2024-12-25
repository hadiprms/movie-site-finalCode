import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import { SkeletonTheme } from 'react-loading-skeleton'
import MovieDetail from './MovieDetails/movieDetail.jsx'
import MainPageRouterFiles from './mainPageComponents/mainPageRouter/mainPageRouter.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorHandler from './errorHandler/errorHandler.jsx'
import WatchlistPage from './watchList/watchList.jsx'
import FeedbackForm from './feedback/feedback.jsx'
import MovieList from './mainPageComponents/MovieFilter/filteredMovies.jsx'
import { FavoriteMoviesProvider } from './mainPageComponents/FavoriteMoviesContext.jsx';
import { useState } from 'react';

const container = document.getElementById('root'); // Adjust if your root ID is different  

const root = ReactDOM.createRoot(container); 
function Main() {
  const [refreshKey, setRefreshKey] = useState(0); // To track the refresh  

  const handleWatchListClick = () => {  
      // Change the key, which will force the WatchlistPage to rerender  
      setRefreshKey(prevKey => prevKey + 1);  
  };

  return (
    <>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <FavoriteMoviesProvider>
          <Router>
              <Routes>
                  <Route path="/" element={<MainPageRouterFiles />} />
                  <Route path="/movie/:movieId" element={<MovieDetail />} />
                  <Route path="/watchlist" element={<WatchlistPage />} /> 
                  <Route path="/feedback" element={<FeedbackForm/>}/>
                  <Route path="/movies/:genre" element={<MovieList/>} /> 
                  <Route path="*" element={<ErrorHandler />}/>
              </Routes>
          </Router>
        </FavoriteMoviesProvider>
      </SkeletonTheme>
    </>
  )
}

export default Main;

root.render(
    <App />
)
