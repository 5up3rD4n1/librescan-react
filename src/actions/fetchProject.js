import actions from './types';

export default (projectId) => {
  return {
    type: actions.FETCH_PROJECT,
    projectId
  }
}