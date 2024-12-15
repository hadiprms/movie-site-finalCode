import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TopRatedMovies from '../mainPageComponents/MostPopularMovies';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';

const mockMovies = [
  {
    node: {
      id: '1',
      primaryImage: { url: 'https://via.placeholder.com/150' },
      titleGenres: { genres: [{ genre: { text: 'Action' } }] },
      titleText: { text: 'Movie 1' },
      releaseYear: { year: 2021 },
      ratingsSummary: { aggregateRating: 7.5 },
    },
  },
  {
    node: {
      id: '2',
      primaryImage: { url: 'https://via.placeholder.com/150' },
      titleGenres: { genres: [{ genre: { text: 'Comedy' } }] },
      titleText: { text: 'Movie 2' },
      releaseYear: { year: 2022 },
      ratingsSummary: { aggregateRating: 8.0 },
    },
  },
  {
    node: {
      id: '3',
      primaryImage: { url: 'https://via.placeholder.com/150' },
      titleGenres: { genres: [{ genre: { text: 'Drama' } }] },
      titleText: { text: 'Movie 3' },
      releaseYear: { year: 2020 },
      ratingsSummary: { aggregateRating: 6.9 },
    },
  },
];

describe('TopRatedMovies Component', () => {
  it('renders correctly with movie data', () => {
    render(
      <MemoryRouter>
        <TopRatedMovies movies={mockMovies} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('movie-title-1')).toBeInTheDocument();
    expect(screen.getByTestId('movie-title-2')).toBeInTheDocument();
    expect(screen.getByTestId('movie-title-3')).toBeInTheDocument();
  });

  it('handles adding/removing a movie to/from favorites', () => {
    render(
      <MemoryRouter>
        <TopRatedMovies movies={mockMovies} />
      </MemoryRouter>
    );

    // Select buttons with `data-testid`
    const movie1Button = screen.getByTestId('favorite-button-1');
    const movie2Button = screen.getByTestId('favorite-button-2');
    const movie3Button = screen.getByTestId('favorite-button-3');

    expect(movie1Button).toBeInTheDocument();
    expect(movie2Button).toBeInTheDocument();
    expect(movie3Button).toBeInTheDocument();

    // Test clicking on Movie 1's favorite button
    fireEvent.click(movie1Button);
    expect(movie1Button).toHaveTextContent('Remove from Favorites');

    fireEvent.click(movie1Button);
    expect(movie1Button).toHaveTextContent('Add to Favorites');

    // Test Movie 2's button
    fireEvent.click(movie2Button);
    expect(movie2Button).toHaveTextContent('Remove from Favorites');

    fireEvent.click(movie2Button);
    expect(movie2Button).toHaveTextContent('Add to Favorites');

    // Test Movie 3's button
    fireEvent.click(movie3Button);
    expect(movie3Button).toHaveTextContent('Remove from Favorites');

    fireEvent.click(movie3Button);
    expect(movie3Button).toHaveTextContent('Add to Favorites');
  });
});
