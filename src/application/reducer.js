import schema from './schema';
import { ACTIONS } from './action';

export default (state = schema, action) => {
  switch (action.type) {

    case ACTIONS.FETCHING:
      return {
        ...state,
        isFetching: true
      };

    case ACTIONS.FETCH_COMPLETE:
      return {
        ...state,
        ...action.value,
        isFetching: false
      };

    case ACTIONS.ERROR:
      return {
        ...state,
        isError: true,
        errorMessage: action.errorMessage
      };

    default:
      return state;
  }
};
