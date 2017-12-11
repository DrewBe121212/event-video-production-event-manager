import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {Application} from './client/app/components/Application';

import {store, history} from './client/app/store';

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import teal from 'material-ui/colors/teal';
import lightBlue from 'material-ui/colors/lightBlue';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: lightBlue,
    type: 'light'
  }
});

render(
  (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <Application />
        </ConnectedRouter>
      </MuiThemeProvider>
    </Provider>
  ), document.getElementById('app'));