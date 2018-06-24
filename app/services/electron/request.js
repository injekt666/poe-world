import Service, {inject as service} from '@ember/service';
import {Promise} from 'rsvp';
import uuid from 'pow/utilities/uuid';

// Constants
const IPC_CHANNEL = 'REQUEST';
const FORBIDDEN_STATUS_CODE = 403;

export default Service.extend({
  authenticationSetting: service('settings/authentication-setting'),
  globalState: service('global-state'),

  fetch(url, params = {}) {
    return this._fetch('GET', url, params);
  },

  _fetch(method, url, params = {}) {
    const poesessid = this.authenticationSetting.poesessid;
    if (!poesessid) return Promise.reject();

    const {ipcRenderer} = requireNode('electron');

    const id = uuid();
    const responseSuccessChannel = `${IPC_CHANNEL}-success-${id}`;
    const responseErrorChannel = `${IPC_CHANNEL}-error-${id}`;

    const requestParams = {
      ...params,
      poesessid,
      responseSuccessChannel,
      responseErrorChannel,
      url,
      method
    };

    ipcRenderer.send(IPC_CHANNEL, requestParams);

    return new Promise((resolve, reject) => {
      ipcRenderer.once(responseSuccessChannel, (_event, data) => {
        ipcRenderer.removeAllListeners(responseErrorChannel);
        this.globalState.flagAsAuthenticated();
        return resolve(data);
      });

      ipcRenderer.once(responseErrorChannel, (_event, error) => {
        ipcRenderer.removeAllListeners(responseSuccessChannel);
        if (error.statusCode === FORBIDDEN_STATUS_CODE) this.globalState.flagAsUnauthenticated();
        return reject(error);
      });
    });
  }
});
