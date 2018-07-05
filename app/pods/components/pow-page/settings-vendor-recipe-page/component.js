import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency';
import {readOnly} from '@ember/object/computed';
import toggleArray from 'poe-world/utilities/toggleArray';

// Constants
const SUPPORTED_STASH_TYPES = ['Premium', 'Normal', 'Quad'];

export default Component.extend({
  stashTabsFetcher: service('fetchers/stash-tabs-fetcher'),
  vendorRecipeSetting: service('settings/vendor-recipe-setting'),

  selectedStashIds: readOnly('vendorRecipeSetting.stashIds'),

  stashes: [],

  stashTabsLoadTask: task(function *() {
    const stashes = yield this.stashTabsFetcher.fetch();
    stashes.forEach((stash) => {
      stash.set('isSelected', this.selectedStashIds.includes(stash.id));
      stash.set('isDisabled', !SUPPORTED_STASH_TYPES.includes(stash.type));
    });

    this.set('stashes', stashes);
  }).drop(),

  willInsertElement() {
    this.stashTabsLoadTask.perform();
  },

  toggleStash(stash) {
    stash.toggleProperty('isSelected');
    this.vendorRecipeSetting.applyStashIds(toggleArray(this.selectedStashIds, stash.id));
  }
});
