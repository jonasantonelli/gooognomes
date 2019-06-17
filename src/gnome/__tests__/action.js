import { ACTIONS, isFetching, isError, fetchComplete } from '../action';


describe('Gnome Actions', () => {

  const _actions = {
    FETCHING: '@gnome/FETCHING',
    ERROR: '@gnome/ERROR',
    FETCH_COMPLETE: '@gnome/FETCH_COMPLETE',
    FETCH_SEARCH_COMPLETE: '@gnome/FETCH_SEARCH_COMPLETE',
    FETCH_FILTER_COMPLETE: '@gnome/FETCH_FILTER_COMPLETE',
    CLEAR_SEARCH: '@gnome/CLEAR_SEARCH',
    CLEAR_FILTER: '@gnome/CLEAR_FILTER',
    FETCH_DETAILS_COMPLETE: '@gnome/FETCH_DETAILS_COMPLETE'
  };

  it('test actions type', () => {
    expect(ACTIONS).toEqual(_actions);
  });

  it('should execute isFetching function', () => {
    expect(isFetching()).toEqual({
      type: _actions.FETCHING
    })
  });

  it('should execute isError function', () => {
    const message = 'it is a error message';
    expect(isError(message)).toEqual({
      type: _actions.ERROR,
      errorMessage: message
    });
  });

  it('should execute isError function', () => {
    const value = {
      test: true
    };
    expect(fetchComplete(value)).toEqual({
      type: _actions.FETCH_COMPLETE,
      value
    });
  });

});
