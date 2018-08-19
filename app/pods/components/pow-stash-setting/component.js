import Component from '@ember/component';
import {computed} from '@ember/object';
import {getOwner} from '@ember/application';
import toggleArray from 'poe-world/utilities/toggleArray';

export default Component.extend({
  stash: null,
  stashFeature: null,

  isIncluded: false,

  isSupported: computed('stash.type', function() {
    return this.stashFeature.supportedTypes.includes(this.stash.type);
  }),

  willInsertElement() {
    const settingService = this._lookupSettingServiceFor(this.stashFeature);
    if (!settingService || !settingService.stashIds) return this.set('isIncluded', false);

    this.set('isIncluded', settingService.stashIds.includes(this.stash.id));
  },

  toggleStash(stash) {
    const settingService = this._lookupSettingServiceFor(this.stashFeature);
    if (!settingService || !settingService.applyStashIds) return;

    settingService.applyStashIds(toggleArray(settingService.stashIds, stash.id));
    this.toggleProperty('isIncluded');
  },

  _lookupSettingServiceFor(stashFeature) {
    return getOwner(this).lookup(`service:${stashFeature.settingService}`);
  }
});
