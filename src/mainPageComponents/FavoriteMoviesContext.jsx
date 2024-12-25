import React, { createContext, useReducer } from 'react';

const FavoriteMoviesContext = createContext();

const initialState = { favorites: [] };

const favoriteMoviesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_FAVORITE':
            return { ...state, favorites: [...state.favorites, action.payload] };
        case 'REMOVE_FAVORITE':
            return { ...state, favorites: state.favorites.filter(id => id !== action.payload) };
        default:
            return state;
    }
};

export const FavoriteMoviesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(favoriteMoviesReducer, initialState);

    return (
        <FavoriteMoviesContext.Provider value={{ state, dispatch }}>
            {children}
        </FavoriteMoviesContext.Provider>
    );
};

export const useFavoriteMovies = () => React.useContext(FavoriteMoviesContext);