import React, { useState, useMemo, createContext } from 'react';
// Import necessary modules from React for managing state and context
import { ThemeProvider, createTheme } from '@mui/material/styles';
// Import ThemeProvider and createTheme from MUI for managing theme

export const ColorModeContext = createContext();
// Create a context named ColorModeContext to share color mode state and functions between components

function ToggleColorMode({ children }) {
  // Define a functional component named ToggleColorMode, taking children as props

  const [mode, setMode] = useState('light');
  // Define state variable 'mode' with initial value 'light' and function 'setMode' to update it

  const toggleColorMode = () => {
    // Define a function named toggleColorMode to toggle between light and dark mode
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    // Update mode state based on its previous value
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);
  // Create a theme object using useMemo to memoize the theme creation, 
  // updating only when 'mode' state changes

  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      {/* Provide the color mode state and functions to child components via context */}
      <ThemeProvider theme={theme}>
        {/* Apply the theme to the child components */}
        {children}
        {/* Render the children components */}
      </ThemeProvider>
    </ColorModeContext.Provider>
    // Wrap the component tree within the ColorModeContext Provider
  );
}

export default ToggleColorMode;
// Export the ToggleColorMode component as default
