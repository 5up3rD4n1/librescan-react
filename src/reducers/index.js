import { i18nReducer } from 'react-redux-i18n';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

import projects from './projects';
import title from './title';
import images from './images';
import views from './views';
import formsMetadata from './formsMetadata';

export default combineReducers({
  title,
  projects,
  images,
  views,
  formsMetadata,
  form: formReducer,
  routing: routerReducer,
  i18n: i18nReducer
});