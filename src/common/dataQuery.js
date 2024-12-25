import { GeneralErrorHandler } from "../errorHandler/generalErrorHandler";  

class DataQuery {
    static async fetch(url) {
        try {
            const options = {  
                method: 'GET',  
                headers: {  
                    'x-rapidapi-key': '02ba152359msh0e2093acc80b4aep1cd334jsnc0fa6d532724',
                    'x-rapidapi-host': 'imdb8.p.rapidapi.com'  
                }  
            };
            const response = await fetch(url, options);  
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`); // Improved error message  
            }  
            const data = await response.json();
            return data;
        } catch (error) {
            GeneralErrorHandler(error);
            throw error;
        }
    }

    static async fetchTopRatedMovies(first) {
        const result = await DataQuery.fetch(`https://imdb8.p.rapidapi.com/title/v2/get-popular?first=${first}&country=US&language=en-US`);
        return result;
    }

    static async fetchMovieDetail(movieId) {
        const resultOfDetail = await DataQuery.fetch(`https://imdb8.p.rapidapi.com/title/v2/get-details?tconst=${movieId}&country=US&language=en-US`);
        return resultOfDetail;
    }
}

export default DataQuery;