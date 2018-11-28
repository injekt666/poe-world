// Vendor
import Component from '@ember/component';
import ENV from 'poe-world/config/environment';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

// Constants
const {APP: {VERSION: CURRENT_VERSION}} = ENV;

export default Component.extend({
  releasesFetcher: service('releases/fetcher'),

  isOutdated: null,
  latestRelease: null,

  fetchLatestReleaseTask: task(function *() {
    const latestRelease = yield this.releasesFetcher.fetchLatest();

    this.setProperties({
      latestRelease,
      currentVersion: CURRENT_VERSION,
      isOutdated: CURRENT_VERSION < latestRelease.version
    });
  }),

  willInsertElement() {
    this.fetchLatestReleaseTask.perform();
  }
});
