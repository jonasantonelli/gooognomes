import shortid from 'shortid';

shortid.generate = jest.fn(() => 0);

export default shortid;
