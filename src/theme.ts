import { createMuiTheme } from '@material-ui/core/styles';
import { amber, teal, red } from '@material-ui/core/colors';

const palette = {
  primary: {
    main: amber[600],
    contrastText: '#ffffff'
  },
  secondary: {
    main: teal[100],
    contrastText: '#000000'
  },
  error: {
    main: red[500]
  },
  background: {
    default: '#ffffff'
  },
}

const theme = createMuiTheme({
  palette,
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: palette.primary.main,
        color: palette.primary.contrastText,
        marginTop: 15,
        transition: 'opacity 0.5s ease',
        opacity: 0.9,
        '&:hover': {
          backgroundColor: palette.primary.main,
          opacity: 1
        },
        '&:disabled': {
          color: palette.primary.contrastText
        }
      }
    },
    MuiOutlinedInput: {
      root: {
        '&:hover $notchedOutline': {
          borderColor: `${palette.secondary.main} !important`
        },
        '&$focused': {
          '$notchedOutline': {
            borderColor: palette.secondary.main
          }
        }
      },
      notchedOutline: {
        '&&': {
          borderWidth: '1px',
          borderColor: palette.primary.main,
        },
      }
    },
    MuiInputLabel: {
      root: {
        color: 'black',
        '&$focused': {
          '&&': {
            color: 'black'
          }
        }
      }
    }
  }
});

export default theme;