import schema from '../schema';
import reducer from '../reducer';
import { ACTIONS } from '../action';

describe('Resource Reducer', () => {

  it('should return schema with isFetching true', () => {
    const result = Object.assign(schema, { isFetching: true});
    expect(reducer(schema, {
      type: ACTIONS.FETCHING
    })).toEqual(result);
  });

  it('should return schema with isFetching false', () => {
    const result = Object.assign(schema, { isFetching: false});
    expect(reducer(schema, {
      type: ACTIONS.FETCH_COMPLETE
    })).toEqual(result);
  });

  it('should return schema with isError true', () => {
    const message = 'mock message';
    const result = Object.assign(schema, { isError: true, errorMessage: message });
    expect(reducer(schema, {
      type: ACTIONS.ERROR,
      errorMessage: message
    })).toEqual(result);
  });

});
