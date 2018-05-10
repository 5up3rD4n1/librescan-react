import actions from './types';

export default (formId) => {
  return {
    type: actions.FETCH_FORMS_METADATA,
    formId
  };
}