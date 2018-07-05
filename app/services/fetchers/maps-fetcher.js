import Service, {inject as service} from '@ember/service';
import Map from 'poe-world/models/map';
import RESOURCES from 'poe-world/constants/resources';

export default Service.extend({
  request: service('request'),

  _mapsPromise: null,

  fetch() {
    if (this._mapsPromise) return this._mapsPromise;

    const mapsPromise = this.request.fetch(RESOURCES.MAPS_JSON_URL).then((rawMaps) => {
      return rawMaps.map((rawMap) => Map.create(rawMap));
    });

    this.set('_mapsPromise', mapsPromise);
    return mapsPromise;
  },

  fetchMap(mapId) {
    return this.fetch().then((maps) => maps.find((map) => map.id === mapId));
  }
});
