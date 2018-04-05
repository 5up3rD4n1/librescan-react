import actions from './types';

export default (viewName, properties) => {
  return {
    type: actions.UPDATE_VIEW_PROPERTIES,
    viewName,
    properties
  };
}