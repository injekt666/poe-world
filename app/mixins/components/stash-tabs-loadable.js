// Vendor
import Mixin from '@ember/object/mixin';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency';

export default Mixin.create({
  toaster: service('toaster'),
  stashTabsFetcher: service('stash/tabs-fetcher'),
  stashItemsFetcher: service('stash/items-fetcher'),

  loadStashItemsTask: task(function *(stashIds) {
    let stashIndexes = [];
    let stashItems = [];

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

    return stashItems;
  }).drop()
});
