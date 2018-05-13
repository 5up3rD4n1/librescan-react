import actions from '../actions/types';
import { generateOutputs } from '../actions';

export default function(action$, store) {
  return action$.ofType(actions.UPDATE_IMAGE_PROCESSED)
    .filter(() => {
      const {content, order} = store.getState().images;

      const remaining = order.reduce((result, key) => result + content[key].processed, 0);
      return remaining >= order.length;
    })
    .map(() => generateOutputs(store.getState().projects.active));
};