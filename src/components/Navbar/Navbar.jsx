import React, { useState, useEffect, useContext } from 'react'; // Import necessary modules from React
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material'; // Import necessary components from MUI
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material'; // Import icons from MUI
import { useTheme } from '@mui/material/styles'; // Import useTheme hook from MUI
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector hooks from react-redux

import useStyles from './styles'; // Import styles from external file

import {Sidebar} from '../Sidebar/Sidebar';
import {Search} from '../Search/Search';

import { setUser } from '../../features/auth'; // Import setUser action from auth feature
import { fetchToken, createSessionId, moviesApi } from '../../utils/index'; // Import utility functions
import { ColorModeContext } from '../../utils/ToggleColorMode'; // Import ColorModeContext from ToggleColorMode file

function Navbar() {
  const classes = useStyles(); // Initialize styles using useStyles hook
  const isMobile = useMediaQuery('(max-width:600px)'); // Check if screen size is mobile
  const theme = useTheme(); // Initialize theme using useTheme hook
  const dispatch = useDispatch(); // Initialize dispatch function
  const { isAuthenticated, user } = useSelector((state) => state.user); // Extract user and authentication status from Redux store
  const [mobileOpen, setMobileOpen] = useState(false); // Initialize state for mobile drawer

  const colorMode = useContext(ColorModeContext); // Initialize color mode using useContext hook

  const token = localStorage.getItem('request_token'); // Get request token from local storage
  const sessionIdFromLocalStorage = localStorage.getItem('session_id'); // Get session ID from local storage

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
          dispatch(setUser(userData)); // Dispatch setUser action with user data
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData)); // Dispatch setUser action with user data
        }
      }
    };

    logInUser();
  }, [token]); // Fetch user data when token changes

  return (
    <>
      {/* App bar component */}
      <AppBar position="fixed">
        {/* Toolbar component */}
        <Toolbar className={classes.toolbar}>
          {/* Menu button for mobile view */}
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          {/* Toggle color mode button */}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {/* Search component */}
          {!isMobile && <Search />}
          {/* User authentication button */}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                {/* User avatar */}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar?.avatar_path}`}
                />
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {/* Drawer component for navigation */}
      <div>
        <nav className={classes.drawer}>
          {/* Conditional rendering of mobile drawer */}
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              {/* Sidebar component */}
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
              {/* Sidebar component */}
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
}

export {Navbar};
