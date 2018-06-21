import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency';
import Ember from 'ember';

export default Component.extend({
  tradeMapsFetcher: service('fetchers/tradeMapsFetcher'),

  map: null,

  tradeMapIds: [],
  tradeMaps: Ember.A([]),
  isMapsInitiallyLoaded: false,

  initialLoadTask: task(function *() {
    const {tradeMapsFetcher, map, tradeMaps} = this.getProperties('tradeMapsFetcher', 'map', 'tradeMaps');
    const {tradeMaps: newTradeMaps, tradeMapIds, total} = yield tradeMapsFetcher.fetchFromMap(map);

    tradeMaps.addObjects(newTradeMaps);

    this.setProperties({
      tradeMapIds,
      total,
      isMapsInitiallyLoaded: true
    });
  }).drop(),

  lazyLoadTask: task(function *() {
    const {tradeMapsFetcher, tradeMapIds, tradeMaps, isMapsInitiallyLoaded} = this.getProperties('tradeMapsFetcher', 'tradeMapIds', 'tradeMaps', 'isMapsInitiallyLoaded');

    if (!isMapsInitiallyLoaded) return null;

    const {tradeMaps: newTradeMaps, tradeMapIds: updatedTradeMapIds} = yield tradeMapsFetcher.fetchFromIds(tradeMapIds);

    tradeMaps.addObjects(newTradeMaps);

    this.set('tradeMapIds', updatedTradeMapIds);
  }).drop(),

  didReceiveAttrs() {
    this.tradeMaps.clear();
    this.initialLoadTask.perform();
  }
});
