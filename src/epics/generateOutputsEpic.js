import * as Api from '../utils/api';

import actions from '../actions/types';
import { updateViewProperties } from '../actions';

export default function (action$) {
  return action$.ofType(actions.GENERATE_OUTPUTS)
    .switchMap(({projectId}) =>
      Api.generateOutputs(projectId)
        .map(() => updateViewProperties('output', {show: true, generating: false}))
    );
};