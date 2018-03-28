import { Observable } from 'rxjs/Observable';
import io from 'socket.io-client';

import { updateImageProcessed } from '../actions';
import actions from '../actions/types';


let socket = io('http://localhost:8080');

let createObservableFromEvent = eventName => Observable.fromEventPattern(
  handler => socket.on(eventName, handler)
);

export default action$ =>
  action$
    .ofType(actions.INIT_APP)
    .mergeMap(() => Observable.merge(
      createObservableFromEvent('image_processed').map((data) => updateImageProcessed(data.imageId))
    ));
