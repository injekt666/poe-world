import Service from '@ember/service';
import Map from 'pow/models/map';
import MAPS from 'pow/constants/maps';

export default Service.extend({
  _mapHash: null,

  fetchSync() {
    if (this._mapHash) return Object.values(this._mapHash);

    return Object.values(this._processMaps());
  },

  fetchMapSync(mapId) {
    if (this._mapHash) return this._mapHash[mapId];

    return this._processMaps()[mapId];
  },

  _processMaps() {
    this._mapHash = Object.keys(MAPS).reduce((hash, mapId) => {
      hash[mapId] = Map.create(MAPS[mapId]);
      return hash;
    }, {});

    return this._mapHash;
  }
});
