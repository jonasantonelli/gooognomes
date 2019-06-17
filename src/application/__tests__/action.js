import { ACTIONS, isFetching, isError, fetchComplete } from '../action';

describe('Application Actions', () => {

  const _actions = {
    FETCHING: '@application/FETCHING',
    ERROR: '@application/ERROR',
    FETCH_COMPLETE: '@application/FETCH_COMPLETE'
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
