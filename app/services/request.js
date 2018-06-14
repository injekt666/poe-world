import Service from '@ember/service';
import {Promise} from 'rsvp';
import fetch from 'fetch';

const MIN_ERROR_STATUS = 400;

export default Service.extend({
  fetch(url, params = {}) {
    return this._fetch('GET', url, params);
  },

  post(url, body, params = {}) {
    return this._fetch('POST', url, {
      ...params,
      body: JSON.stringify(body)
    });
  },

  _fetch(method, url, params = {}) {
    const fetchParams = {
      ...params,
      method
    };

    return new Promise((resolve, reject) => {
      fetch(url, fetchParams).then((response) => {
        if (response.status >= MIN_ERROR_STATUS) return reject(null);

        response.json().then(resolve);
      });
    });
  }
});
