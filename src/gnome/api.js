import axios from 'axios';
import { resolveURL, mock } from '../__core__/helpers/api';

import list from './__fixtures__/list.json';

const getList = (isMock) => {
  if(isMock) {
    return mock(list);
  }

  return axios.get(resolveURL('/rrafols/mobile_test/master/data.json'))
      .then(response => response.data);
}

export default getList;
