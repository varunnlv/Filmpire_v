import { createSlice } from '@reduxjs/toolkit'; // Import createSlice function from Redux Toolkit

const initialState = {
  user: {}, // Holds user data
  isAuthenticated: false, // Indicates whether the user is authenticated or not
  sessionId: '', // Holds the session ID
};

// Define the authSlice
const authSlice = createSlice({
  name: 'user', // Name of the slice
  initialState, // Initial state of the slice
  reducers: {
    // Reducer to handle setting user data and authentication status
    setUser: (state, action) => {
      state.user = action.payload; // Update user data
      state.isAuthenticated = true; // Set isAuthenticated to true
      state.sessionId = localStorage.getItem('session_id'); // Get session ID from local storage

      localStorage.setItem('accountId', action.payload.id); // Store account ID in local storage
    },
  },
});

// Export action creators
export const { setUser } = authSlice.actions;

// Export reducer function
export default authSlice.reducer;
