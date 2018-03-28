import './dependencies';

import { combineEpics } from 'redux-observable';
import initAppEpic from './initAppEpic';
import fetchProject from './fetchProjectEpic';
import fetchProjects from './fetchProjectsEpic';
import fetchImages from './fetchImagesEpic';
import createImages from './createImagesEpic';


export default combineEpics(
  initAppEpic,
  fetchProject,
  fetchProjects,
  fetchImages,
  createImages
);