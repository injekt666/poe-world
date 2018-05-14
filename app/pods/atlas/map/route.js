import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({
  mapsFetcher: service('fetchers/maps-fetcher'),
  atlasReframer: service('reframers/atlas-reframer'),

  model(params) {
    return this.mapsFetcher.fetchMapSync(params.slug);
  },

  afterModel(map) {
    if (!map) return null;

    this.atlasReframer.reframeFor(map);
  }
});
