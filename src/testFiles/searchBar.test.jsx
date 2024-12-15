import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Fetcher from '../mainPageComponents/searchBar';
import { searchMoviesFetch } from '../common/searchDataQuery';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';

vi.mock('../common/searchDataQuery', () => ({
    searchMoviesFetch: vi.fn(),
}));

describe('Fetcher Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('displays search results correctly when a valid query is entered', async () => {
        const mockMovies = [
            { id: 1, l: 'Movie 1', i: { imageUrl: 'http://example.com/movie1.jpg' } },
            { id: 2, l: 'Movie 2', i: { imageUrl: 'http://example.com/movie2.jpg' } },
            { id: 3, l: 'Movie 3', i: { imageUrl: 'http://example.com/movie3.jpg' } },
            { id: 4, l: 'Movie 4', i: { imageUrl: 'http://example.com/movie4.jpg' } },
        ];
        searchMoviesFetch.mockResolvedValueOnce(mockMovies);

        render(
            <MemoryRouter>
                <Fetcher />
            </MemoryRouter>
        );

        // Simulate user typing a query  
        const input = screen.getByPlaceholderText('Search for a movie...');
        fireEvent.change(input, { target: { value: 'Movie' } });
        fireEvent.click(screen.getByText('Search'));

        // Wait for the loading message to disappear  
        await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

        // Assert: Check if each movie title is displayed correctly  
        const movieTitles = ['Movie 1', 'Movie 2', 'Movie 3', 'Movie 4'];

        for (const title of movieTitles) {
            expect(screen.getByText(title, { selector: 'span' })).toBeInTheDocument();
        }
    });
});