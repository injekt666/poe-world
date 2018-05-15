import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import {on} from '@ember/object/evented';

export default Route.extend({
  mapsFetcher: service('fetchers/maps-fetcher'),
  atlasReframer: service('reframers/atlas-reframer'),

  model(params) {
    const currentMap = this.mapsFetcher.fetchMapSync(params.slug);

    this._setAtlasCurrentMap(currentMap);
    return currentMap;
  },

  afterModel(map) {
    if (!map) return null;

    this.atlasReframer.reframeFor(map);
  },

  currentMapClear: on('deactivate', function() {
    this._setAtlasCurrentMap(null);
  }),

  _setAtlasCurrentMap(map) {
    this.controllerFor('atlas').set('currentMap', map);
  }
});
