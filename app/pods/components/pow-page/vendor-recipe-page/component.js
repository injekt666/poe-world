import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {task, timeout} from 'ember-concurrency';
import CURRENCIES from 'poe-world/constants/currencies';

// Constants
const RECIPE_POLLING_INTERVAL = 60000; // 60 seconds

export default Component.extend({
  stashTabsFetcher: service('fetchers/stash-tabs-fetcher'),
  stashItemsFetcher: service('fetchers/stash-items-fetcher'),
  vendorRecipeSetting: service('settings/vendor-recipe-setting'),
  chromaticRecipeBuilder: service('builders/chromatic-recipe-builder'),
  jewellerRecipeBuilder: service('builders/jeweller-recipe-builder'),
  divineRecipeBuilder: service('builders/divine-recipe-builder'),
  chaosRecipeBuilder: service('builders/chaos-recipe-builder'),

  hasNoStashToLoad: false,

  chromaticImageUrl: CURRENCIES.chrom.imageUrl,
  jewellerImageUrl: CURRENCIES.jew.imageUrl,
  divineImageUrl: CURRENCIES.divine.imageUrl,
  chaosImageUrl: CURRENCIES.chaos.imageUrl,
  regalImageUrl: CURRENCIES.regal.imageUrl,
  chromaticRecipe: null,
  jewellerRecipe: null,
  divineRecipe: null,
  chaosRecipe: null,

  vendorRecipeLoadTask: task(function *() {
    const stashIdsToLoad = this.vendorRecipeSetting.stashIds;
    let stashIndexes = [];

    if (stashIdsToLoad.length) {
      const stashTabs = yield this.stashTabsFetcher.fetch();
      stashIndexes = stashTabs
        .filter((stashTab) => stashIdsToLoad.includes(stashTab.id))
        .map((stashTab) => stashTab.index);
    }

    let stashItems = [];
    while (stashIndexes.length) {
      const newStashItems = yield this.stashItemsFetcher.fetchFromStashIndex(stashIndexes.shift());
      stashItems = stashItems.concat(newStashItems);
    }

    this.setProperties({
      chromaticRecipe: this.chromaticRecipeBuilder.build(stashItems),
      jewellerRecipe: this.jewellerRecipeBuilder.build(stashItems),
      divineRecipe: this.divineRecipeBuilder.build(stashItems),
      chaosRecipe: this.chaosRecipeBuilder.build(stashItems)
    });
  }).drop(),

  vendorRecipePollingTask: task(function *() {
    while (true) {
      yield timeout(RECIPE_POLLING_INTERVAL);

      try {
        yield this.vendorRecipeLoadTask.perform();
      } catch (_error) {
        // Prevent an API glitch from stopping the poll
      }
    }
  }).drop(),

  vendorRecipeInitialLoadTask: task(function *() {
    yield this.vendorRecipeLoadTask.perform();
  }).drop(),

  willInsertElement() {
    this.vendorRecipeInitialLoadTask.perform();
    this.vendorRecipePollingTask.perform();
  }
});
