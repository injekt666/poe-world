import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  leaguesFetcher: service('leagues/fetcher'),
  authenticationStateFetcher: service('authentication/state-fetcher'),
  activeLeagueSetting: service('active-league/setting'),

  model() {
    return this.leaguesFetcher.fetch();
  },

  afterModel(leagues) {
    this.activeLeagueSetting.initializeFrom(leagues);

    // There's no point waiting for the response, the electron request
    // service will set the `globalState.isAuthenticated` by itself
    this.authenticationStateFetcher.fetch();
  }
});
