import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {task, timeout} from 'ember-concurrency';
import PoeAuthenticationError from 'poe-world/errors/poe-authentication-error';

// Constants
const SUMMARY_POLLING_INTERVAL = 300000; // 5 minutes

export default Component.extend({
  toaster: service('toaster'),
  stashTabsFetcher: service('fetchers/stash-tabs-fetcher'),
  stashItemsFetcher: service('fetchers/stash-items-fetcher'),
  divinationSummarySetting: service('settings/divination-summary-setting'),
  divinationSummaryBuilder: service('builders/divination-summary-builder'),

  hasDivinationSummaryStashes: false,

  divinationSummary: null,

  divinationSummaryLoadTask: task(function *() {
    const stashIdsToLoad = this.divinationSummarySetting.stashIds;
    const hasDivinationSummaryStashes = stashIdsToLoad.length > 0;
    let stashIndexes = [];
    let stashItems = [];

    try {
      if (hasDivinationSummaryStashes) {
        const stashTabs = yield this.stashTabsFetcher.fetch();
        stashIndexes = stashTabs
          .filter((stashTab) => stashIdsToLoad.includes(stashTab.id))
          .map((stashTab) => stashTab.index);
      }

      while (stashIndexes.length) {
        const newStashItems = yield this.stashItemsFetcher.fetchFromStashIndex(stashIndexes.shift());
        stashItems = stashItems.concat(newStashItems);
      }

    } catch (error) {
      if (!(error instanceof PoeAuthenticationError)) this.toaster.toastUnexpectedError();
    }

    this.setProperties({
      hasDivinationSummaryStashes,
      divinationSummary: this.divinationSummaryBuilder.build(stashItems)
    });
  }).drop(),

  divinationSummaryPollingTask: task(function *() {
    while (true) {
      yield timeout(SUMMARY_POLLING_INTERVAL);

      try {
        yield this.divinationSummaryLoadTask.perform();
      } catch (_error) {
        // Prevent an API glitch from stopping the poll
      }
    }
  }).drop(),

  divinationSummaryInitialLoadTask: task(function *() {
    yield this.divinationSummaryLoadTask.perform();
  }).drop(),

  willInsertElement() {
    this.divinationSummaryInitialLoadTask.perform();
    this.divinationSummaryPollingTask.perform();
  }
});
