import actions from '../actions/types';

const initialState = {
  thumbnails: {
    width: 200,
    height: 200,
  },
  imagesSidebar: {
    show: true
  },
  preferences: {
    show: false
  },
  studio: {
    width: 400,
    height: 400,
  },
  output: {
    show: false,
    generating: false,
  }
};

export default (state=initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_VIEW_VISIBILITY:
      return { ...state, [action.viewName]: {...state[action.viewName], show: action.show}};
    case actions.UPDATE_VIEW_PROPERTIES:
      return { ...state, [action.viewName]: {...state[action.viewName], ...action.properties}};
    case actions.UPDATE_THUMBNAILS_VIEW:
      return { ...state, thumbnails: {...state.thumbnails, ...action.properties}};
    case actions.GENERATE_OUTPUTS:
      return {...state, output: {...state.output, generating: true}};
    default:
      return state;
  }
}