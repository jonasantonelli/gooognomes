import normalizeAction from '../helpers/action';

describe('Helpers action', () => {
  it('should normalize an action', () => {
    const types = [
      'TEST'
    ];

    const normalized = normalizeAction('@unitTest', types);

    expect(normalized).toEqual({
      TEST: '@unitTest/TEST'
    });

  });
});
