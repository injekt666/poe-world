import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency';
import {readOnly} from '@ember/object/computed';

export default Component.extend({
  leaguesFetcher: service('fetchers/leagues-fetcher'),
  leagueSetting: service('settings/league-setting'),

  currentLeagueSlug: readOnly('leagueSetting.league.slug'),

  leagues: [],

  leaguesLoadTask: task(function *() {
    const leagues = yield this.leaguesFetcher.fetch();
    this.set('leagues', leagues);
  }).drop(),

  willInsertElement() {
    this.leaguesLoadTask.perform();
  },

  applyLeague(league) {
    this.leagueSetting.apply(league);
  }
});
