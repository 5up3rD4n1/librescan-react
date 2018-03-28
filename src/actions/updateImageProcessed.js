import actions from './types';

export default (imageId) => {
  return {
    type: actions.UPDATE_IMAGE_PROCESSED,
    imageId
  }
}