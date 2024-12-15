import { describe, it, expect, vi } from 'vitest';
import DataQuery from '../common/dataQuery';

global.fetch = vi.fn();

describe('<DataQuery/>', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should successfully fetch top-rated movies if the API key is valid', async () => {
        const mockResponse = {
            results: [{ id: 'tt1234567', title: 'Movie 1' }, { id: 'tt1234568', title: 'Movie 2' }]
        };
        
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const response = await DataQuery.fetchTopRatedMovies(10);

        // Log the response to the console
        console.log('Top-rated movies response:', response);

        expect(response).toBeDefined();
        expect(response.results).toBeDefined();
        expect(Array.isArray(response.results)).toBe(true);
        expect(response.results.length).toBeGreaterThan(0);
    });

    it('should successfully fetch movie details if the API key is valid', async () => {
        const movieId = 'tt1234567';
        const mockDetailResponse = {
            title: 'Example Movie',
            id: movieId,
            year: 2021,
            summary: 'A great movie.',
        };
        
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockDetailResponse,
        });

        const response = await DataQuery.fetchMovieDetail(movieId);

        // Log the response to the console
        console.log('Movie details response:', response);

        expect(response).toBeDefined();
        expect(response).toEqual(mockDetailResponse);
        expect(response.id).toEqual(movieId);
    });
});
