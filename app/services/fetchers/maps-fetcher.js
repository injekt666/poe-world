import Service from '@ember/service';
import Map from 'pow/models/map';
import MAPS from 'pow/constants/maps';

export default Service.extend({
  fetchSync() {
    return Object.values(MAPS).map((rawMap) => Map.create(rawMap));
  }
});
