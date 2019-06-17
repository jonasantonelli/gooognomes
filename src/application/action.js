import normalizeAction from '../__core__/helpers/action';

/* action types */
const ACTIONS = normalizeAction('@application', [
  'FETCHING',
  'FETCH_COMPLETE',
  'ERROR'
]);

function isFetching() {
  return {
    type: ACTIONS.FETCHING
  }
}

function isError(message) {
  return {
    type: ACTIONS.ERROR,
    errorMessage: message
  }
}

function fetchComplete(value) {
  return {
    type: ACTIONS.FETCH_COMPLETE,
    value
  }
}


export { isError, isFetching, fetchComplete, ACTIONS };
