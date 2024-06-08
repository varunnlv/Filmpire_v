import { makeStyles } from '@mui/styles'; // Import makeStyles function from MUI styles

const drawerWidth = 240; // Define the width of the drawer

// Define styles using makeStyles function
export default makeStyles((theme) => ({
  // Styles for the toolbar component
  toolbar: {
    height: '80px', // Set height
    display: 'flex', // Set display to flex
    justifyContent: 'space-between', // Align items with space between
    marginLeft: '240px', // Set left margin to accommodate the drawer
    [theme.breakpoints.down('sm')]: { // Media query for small screens
      marginLeft: 0, // Reset left margin to 0
      flexWrap: 'wrap', // Allow flex items to wrap
    },
  },
  // Styles for the menu button component
  menuButton: {
    marginRight: theme.spacing(2), // Set right margin using theme spacing
    [theme.breakpoints.up('sm')]: { // Media query for screens larger than small
      display: 'none', // Hide the menu button
    },
  },
  // Styles for the drawer component
  drawer: {
    [theme.breakpoints.up('sm')]: { // Media query for screens larger than small
      width: drawerWidth, // Set the width of the drawer
      flexShrink: 0, // Prevent shrinking of the drawer
    },
  },
  // Styles for the drawer paper component
  drawerPaper: {
    width: drawerWidth, // Set the width of the drawer paper
  },
  // Styles for link buttons
  linkButton: {
    '&:hover': { // Apply styles on hover
      color: 'white !important', // Set text color to white on hover
      textDecoration: 'none', // Remove underline on hover
    },
  },
}));
