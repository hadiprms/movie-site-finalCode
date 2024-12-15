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
const container = document.getElementById('root'); // Adjust if your root ID is different  

const root = ReactDOM.createRoot(container); 
function Main() {

  return (
    <>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
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
      </SkeletonTheme>
    </>
  )
}

export default Main;

root.render(
    <App />
)
