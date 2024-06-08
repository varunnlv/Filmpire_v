import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  searchContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContainer: 'center',
      width: '100%',
    },
  },
  input: {
    color: theme.palette.mode === 'light' && 'dark',
    filter: theme.palette.mode === 'light' && 'invert(1)',
    width: '90vh',
    [theme.breakpoints.down('sm')]: {
      marginTop: '-10px',
      marginBottom: '10px',
    },
  },
}));