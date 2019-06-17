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

    case ACTIONS.FETCH_SEARCH_COMPLETE:
      return {
        ...state,
        search: action.search,
        isFetching: false
      };

    case ACTIONS.CLEAR_SEARCH:
      return {
        ...state,
        search: [],
        isFetching: false
      };

    case ACTIONS.CLEAR_FILTER:
      return {
        ...state,
        search: [],
        filter: {
          ...state.filter,
          range: action.range,
          professions: action.professions
        },
        isFetching: false
      };

    case ACTIONS.FETCH_FILTER_COMPLETE:
      return {
        ...state,
        search: action.search,
        filter: {
          ...state.filter,
          ...action.filter
        },
        isFetching: false
      };

    case ACTIONS.FETCH_DETAILS_COMPLETE:
      return {
        ...state,
        details: action.details,
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
