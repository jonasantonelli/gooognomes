import config from 'config';

export const URL = config.apiURL;
export const resolveURL = endpoint => `${URL}${endpoint}`;

export const mock = file => new Promise((resolve, reject) => {
    setTimeout(() => {
      if(!file) {
        reject();
      }
    });
    resolve(file);
});
