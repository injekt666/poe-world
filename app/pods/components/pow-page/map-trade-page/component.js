import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency';
import Ember from 'ember';

export default Component.extend({
  tradeMapsFetcher: service('fetchers/tradeMapsFetcher'),

  map: null,

  tradeMaps: Ember.A([]),
  isMapsLoaded: false,

  initialLoadTask: task(function *() {
    const {tradeMapsFetcher, map, tradeMaps} = this.getProperties('tradeMapsFetcher', 'map', 'tradeMaps');
    const {tradeMaps: newTradeMaps, nextTradeMapIds, total} = yield tradeMapsFetcher.fetchFromMap(map);

    tradeMaps.addObjects(newTradeMaps);
    this.setProperties({
      nextTradeMapIds,
      total,
      isMapsLoaded: true
    });
  }).drop(),

  didReceiveAttrs() {
    this.tradeMaps.clear();
    this.initialLoadTask.perform();
  }
});
