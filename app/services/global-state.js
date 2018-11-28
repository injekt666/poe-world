// Vendor
import Service, {inject as service} from '@ember/service';
import {not} from '@ember/object/computed';

export default Service.extend({
  authenticationSetting: service('authentication/setting'),

  isDesktop: null,
  isAuthenticated: null,

  isWeb: not('isDesktop'),

  init() {
    this._super(...arguments);

    this.set('isDesktop', window.ELECTRON);
    this.set('isAuthenticated', Boolean(this.authenticationSetting.poesessid));
  }
});
