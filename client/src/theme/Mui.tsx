import { createMuiTheme } from '@material-ui/core/styles';

interface PaletteIntention {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
};

const inkline = createMuiTheme({
  palette: {
    primary: {
      light: '#F9F9F9',
      main: '#9C0A02',
      dark: '#9C0A02',
      contrastText: '#fff',
    },
    secondary: {
      main: '#727C82'
    }
  },
});

export default inkline;
