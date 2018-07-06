import Component from '@ember/component';
import {inject as service} from '@ember/service';
import ENV from 'poe-world/config/environment';
import STORAGE_KEYS from 'poe-world/constants/storage-keys';

// Constants
const {APP: {VERSION, CHANGELOG}} = ENV;

export default Component.extend({
  storage: service('storage'),

  changelogMarkdown: CHANGELOG,
  isOpened: false,

  onClose() {
    this.storage.setValue(STORAGE_KEYS.LAST_SESSION_VERSION, VERSION);

    this.set('isOpened', false);
  },

  willInsertElement() {
    const lastSessionVersion = this.storage.getValue(STORAGE_KEYS.LAST_SESSION_VERSION);

    if (lastSessionVersion === VERSION) return;

    this.set('isOpened', true);
  }
});
