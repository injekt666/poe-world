import Service, {inject as service} from '@ember/service';
import League from 'pow/models/league';
import RESOURCES from 'pow/constants/resources';

export default Service.extend({
  request: service('request'),

  _leaguesPromise: null,

  fetch() {
    if (this._leaguesPromise) return this._leaguesPromise;

    const leaguesPromise = this.request.fetch(RESOURCES.LEAGUES_JSON_URL).then((rawLeagues) => {
      return rawLeagues.map((rawLeague) => League.create(rawLeague));
    });

    this.set('_leaguesPromise', leaguesPromise);
    return leaguesPromise;
  }
});
