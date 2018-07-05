import Service, {inject as service} from '@ember/service';
import {Promise} from 'rsvp';
import PRIVATE_API from 'poe-world/constants/private-api';

export default Service.extend({
  electronRequest: service('electron/request'),
  authenticationSetting: service('settings/authentication-setting'),
  leagueSetting: service('settings/league-setting'),
  globalState: service('global-state'),

  fetch() {
    const leagueId = this.leagueSetting.league.id;
    const account = this.authenticationSetting.account;

    if (!this.globalState.isElectron || !account) return Promise.reject(null);

    return this.electronRequest.fetch(`${PRIVATE_API.CHARACTER_WINDOW_BASE_URL}/get-stash-items?accountName=${account}&league=${leagueId}`);
  }
});
