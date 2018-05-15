import Component from '@ember/component';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Component.extend({
  mapsFetcher: service('fetchers/maps-fetcher'),

  map: null,

  sextantMaps: computed('map', function() {
    const {map, mapsFetcher} = this.getProperties('map', 'mapsFetcher');
    return map.sextants.map((mapId) => mapsFetcher.fetchMapSync(mapId));
  })
});
