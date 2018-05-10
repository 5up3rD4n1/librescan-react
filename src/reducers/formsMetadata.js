import actions from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case actions.UPDATE_FORMS_METADATA:
      return action.formsMetadata;
    default:
      return state;
  }
}