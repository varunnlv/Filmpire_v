import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../services/TMDB'; // Import TMDB API slice
import genreOrCategoryReducer from '../features/currentGenreOrCategory'; // Import reducer for genre or category feature
import userReducer from '../features/auth'; // Import reducer for user authentication feature

// Export the Redux store configuration
export default configureStore({
  // Define reducers to be combined into the root reducer
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer, // Associate TMDB API reducer with its path
    currentGenreOrCategory: genreOrCategoryReducer, // Associate genre or category reducer with its slice name
    user: userReducer, // Associate user reducer with its slice name
  },
  // Customize middleware used by the store
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware), // Concatenate default middleware with additional TMDB API middleware
});
