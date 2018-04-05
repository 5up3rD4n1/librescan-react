import actions from './types';

export default (projectId) => {
  return {
    type: actions.GENERATE_OUTPUTS,
    projectId
  };
}