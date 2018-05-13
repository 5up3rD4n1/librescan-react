import * as Api from '../utils/api';

import actions from '../actions/types';
import { updateFormsMetadata } from '../actions';

export default function (action$) {
  return action$.ofType(actions.FETCH_FORMS_METADATA)
    .switchMap(({formId}) => Api.formsMetadata(formId)
      .map(data => updateFormsMetadata(data.response))
      .catch(error => { console.log(error); throw new Error(error) })
    );
};