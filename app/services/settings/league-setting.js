import Service, {inject as service} from '@ember/service';

export default Service.extend({
  localStorage: service('local-storage'),
  leaguesFetcher: service('fetchers/leagues-fetcher'),

  league: null,

  apply(league) {
    this.set('league', league);
    this.localStorage.setValue('league', league.slug);
  },

  initialize() {
    return this.leaguesFetcher.fetch().then((leagues) => {
      const currentLeague = this._getCurrentLeagueFrom(leagues);
      const defaultLeague = this._getDefaultLeagueFrom(leagues);

      if (currentLeague) return this.set('league', currentLeague);

      this.apply(defaultLeague);
    });
  },

  _getCurrentLeagueFrom(leagues) {
    const currentLeagueSlug = this.localStorage.getValue('league');

    if (!currentLeagueSlug) return null;

    return leagues.find((league) => league.slug === currentLeagueSlug);
  },

  _getDefaultLeagueFrom(leagues) {
    const applicableLeagues = leagues.filter((league) => !/(hardcode|standard)/i.test(league.id));

    if (applicableLeagues.length > 0) return applicableLeagues[0];

    const standardLeague = leagues.find((league) => /standard/i.test(league.id));

    return standardLeague || null;
  }
});
