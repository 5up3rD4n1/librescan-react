import actions from './types';

export default (formsMetadata) => {
  return {
    type: actions.UPDATE_FORMS_METADATA,
    formsMetadata
  }
}