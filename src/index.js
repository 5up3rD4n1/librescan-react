import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './storage'
import { App } from './containers';
import registerServiceWorker from './utils/registerServiceWorker';

import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import blueGray from 'material-ui/colors/blueGrey';

// Modify material theme here
const theme = createMuiTheme({
  palette: {
    primary: blueGray
    //type: 'dark', // Switching the dark mode on is a single property value change.
  },
  typography: {
    // In Japanese the characters are usually larger.
    fontSize: 15,
  },
});


render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App/>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

registerServiceWorker();
