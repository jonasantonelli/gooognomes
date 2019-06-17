import schema from '../schema';

describe('Resource Schema', () => {

  const initialSchema = {
    isError: false,
    errorMessage: '',
    isFetching: true,
    list: [],
    search: [],
    details: {},
    filter: {
      professions: [],
      minAge: 0,
      maxAge: 100,
      range: {
        min: 20,
        max: 80
      }
    }
  };

  it('should return initial schema ', () => {
    expect(schema).toEqual(initialSchema);
  });
});
