import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({
  leaguesFetcher: service('fetchers/leagues-fetcher'),
  leagueSetting: service('settings/league-setting'),

  model() {
    return this.leaguesFetcher.fetch();
  },

  afterModel(leagues) {
    this.leagueSetting.initializeFrom(leagues);
  }
});
