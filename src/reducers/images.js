import actions from '../actions/types';

const defaultState = {content:{}, order:[], active:[]};

export default (state=defaultState, action) => {
  switch (action.type) {
    case actions.UPDATE_ACTIVE_IMAGES:
      return {...state, active: action.images};
    case actions.UPDATE_IMAGES:
      return addImagesToState(defaultState, action.images, action.active);
    case actions.ADD_IMAGES:
      const active = action.images.map(image => image.id);
      return addImagesToState(state, action.images, active);
    case actions.UPDATE_IMAGE_PROCESSED:
      return {
        ...state,
        content: {
          ...state.content, [action.imageId]: {
            ...state.content[action.imageId],
            processed: true
          }
        }
      };
    default:
      return state;
  }
}

const addImagesToState = (state, images, active=[]) => {
  let newState = images.reduce((result, image) => {
    return ({
      ...result,
      content: {
        ...result.content,
        [image.id]: image
      },
      order: [
        ...result.order,
        image.id
      ]
    });
  }, state);

  return {
    ...newState,
    active: [...active]
  }
};