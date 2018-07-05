import Component from '@ember/component';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Component.extend({
  mapsFetcher: service('fetchers/maps-fetcher'),

  map: null
});
