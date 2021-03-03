import React from 'react';
import { decimalToBaseX, baseXtoDecimal } from './algorithms';

//MUI
import { ThemeProvider as MUIThemeProvider, makeStyles } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#E42529',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
});

const useStyles = makeStyles(innerTheme => ({
  root: {
    flexGrow: 1,
  },
  layoutGrid: {
    // borderWidth: 1,
    // borderColor: 'red',
    // borderStyle: 'solid',
    [innerTheme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  title: {
    textAlign: 'center',
    marginBottom: '2em',
    marginTop: '1em'
  },
  selectInput: {
    width: '100%',
  },
  numberInput: {
    marginTop: 10,
    marginBottom: 10,
  }
}));

function App() {

  const classes = useStyles();

  const [fromBase, setFromBase] = React.useState(10);
  const [toBase, setToBase] = React.useState(2);
  const [number, setNumber] = React.useState(0);
  const [result, setResult] = React.useState(0);

  const bases = [2, 3, 4, 5, 6, 7, 8, 9, 10];

  const changeNumber = event => {
    if(!Number(event.target.value) && event.target.value !== '') {
      return;
    }
    setNumber(Number(event.target.value));

    if(fromBase === 10){
      setResult(decimalToBaseX(Number(event.target.value), toBase));
      return;
    }
    if(toBase === 10){
      setResult(baseXtoDecimal(Number(event.target.value), fromBase));
      return;
    }
    if(fromBase !== 10 && toBase !== 10){
      const getFromDecimal = baseXtoDecimal(Number(event.target.value), fromBase);
      setResult(decimalToBaseX(getFromDecimal, toBase));
      return;
    }
  }

  React.useEffect(() => {
    setNumber(0);
    setResult(0);
  //es-lint-disable-next-line
  }, [fromBase, toBase])

  return (
    <MUIThemeProvider theme={theme}>
      <Grid container className={classes.root}>
        <Grid item lg={4} className={classes.layoutGrid}/>
        <Grid item lg={4} xs={12} sm={12}>
          <Typography
          variant="h6"
          color="primary"
          className={classes.title}
          >
            Number Systems Converter
          </Typography>

          <Grid container spacing={1}>
            <Grid item lg={6} sm={12} xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">From Base</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="From Base"
                fullWidth
                className={classes.selectInput}
                value={fromBase}
                onChange={e => setFromBase(Number(e.target.value))}
                autoFocus
              >
                {
                  bases.map((base, _i) => <MenuItem key={_i} value={base}>{base}{base === 2 ? ` (binary)` : base === 8 ? `(octal)` : base === 10 ? `(decimal)` : ``}</MenuItem>)
                }
              </Select>
            </FormControl>
            </Grid>
            <Grid item lg={6} sm={12} xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">To Base</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="To Base"
                fullWidth
                className={classes.selectInput}
                value={toBase}
                onChange={e => setToBase(Number(e.target.value))}
              >
                {
                  bases.filter(base => base !== fromBase).map((base, _i) => <MenuItem key={_i} value={base}>{base}{base === 2 ? ` (binary)` : base === 8 ? `(octal)` : base === 10 ? `(decimal)` : ``}</MenuItem>)
                }
              </Select>
            </FormControl>
            </Grid>
          </Grid>
          <TextField
          label="Number"
          variant="outlined"
          fullWidth
          className={classes.numberInput}
          value={number.toString(10)}
          onChange={changeNumber}
          />
          <TextField
          label="Result"
          variant="outlined"
          fullWidth
          className={classes.numberInput}
          value={result.toString(10)}
          />
        </Grid>

        <Grid item lg={4} className={classes.layoutGrid}/>
      </Grid>
    </MUIThemeProvider>
  );
}

export default App;
