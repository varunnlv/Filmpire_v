import { createSlice } from '@reduxjs/toolkit'; // Import createSlice function from Redux Toolkit

// Define the genreOrCategory slice
export const genreOrCategory = createSlice({
  name: 'genreOrCategory', // Name of the slice
  initialState: { // Initial state of the slice
    genreIdOrCategoryName: '', // Holds the selected genre ID or category name
    page: 1, // Holds the current page number
    searchQuery: '', // Holds the search query
  },
  reducers: {
    // Reducer to handle selecting genre or category
    selectGenreOrCategory: (state, action) => {
      state.genreIdOrCategoryName = action.payload; // Update genre ID or category name
      state.searchQuery = ''; // Reset search query
    },
    // Reducer to handle searching for movies
    searchMovie: (state, action) => {
      state.searchQuery = action.payload; // Update search query
    },
  },
});

// Export action creators
export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;

// Export reducer function
export default genreOrCategory.reducer;
