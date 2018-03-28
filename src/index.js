import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './storage'
import { App } from './containers';


import registerServiceWorker from './utils/registerServiceWorker';

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
