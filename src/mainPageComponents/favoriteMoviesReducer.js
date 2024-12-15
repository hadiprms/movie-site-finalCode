// favoriteMoviesReducer.js  
export const initialState = {  
    favorites: JSON.parse(localStorage.getItem('favorites')) || []  
};  

export const favoriteMoviesReducer = (state, action) => {  
    switch (action.type) {  
        case 'ADD_FAVORITE':  
            const updatedFavoritesAdd = [...new Set([...state.favorites, action.payload])];
            localStorage.setItem('favorites', JSON.stringify(updatedFavoritesAdd));  
            return { ...state, favorites: updatedFavoritesAdd };  
        case 'REMOVE_FAVORITE':  
            const updatedFavoritesRemove = state.favorites.filter(id => id !== action.payload);  
            localStorage.setItem('favorites', JSON.stringify(updatedFavoritesRemove));  
            return { ...state, favorites: updatedFavoritesRemove };  
        default:  
            return state;  
    }  
};