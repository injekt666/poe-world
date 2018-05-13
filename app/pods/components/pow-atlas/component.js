import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  mapsFetcher: service('fetchers/maps-fetcher'),

  maps: [],
  hoveredMap: null,
  zoom: 1,
  panTop: 0,
  panLeft: 0,

  willInsertElement() {
    this.set('maps', this.get('mapsFetcher').fetchSync());
  },

  mapEnter(map) {
    this.set('hoveredMap', map);
  },

  mapLeave() {
    this.set('hoveredMap', null);
  },

  panzoom(panzoomParams) {
    this.setProperties(panzoomParams);
  }
});
