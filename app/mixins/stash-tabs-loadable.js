import Mixin from '@ember/object/mixin';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency';
import PoeAuthenticationError from 'poe-world/errors/poe-authentication-error';

export default Mixin.create({
  stashTabsFetcher: service('fetchers/stash-tabs-fetcher'),
  stashItemsFetcher: service('fetchers/stash-items-fetcher'),

  loadStashItemsTask: task(function *(stashIds) {
    let stashIndexes = [];
    let stashItems = [];

    try {
      if (stashIds.length) {
        const stashTabs = yield this.stashTabsFetcher.fetch();
        stashIndexes = stashTabs
          .filter((stashTab) => stashIds.includes(stashTab.id))
          .map((stashTab) => stashTab.index);
      }

      while (stashIndexes.length) {
        const newStashItems = yield this.stashItemsFetcher.fetchFromStashIndex(stashIndexes.shift());
        stashItems = stashItems.concat(newStashItems);
      }

    } catch (error) {
      if (!(error instanceof PoeAuthenticationError)) this.toaster.toastUnexpectedError();
    }

    return stashItems;
  }).drop()
});
