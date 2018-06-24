import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency';
import {readOnly} from '@ember/object/computed';

export default Component.extend({
  authStateFetcher: service('fetchers/auth-state-fetcher'),
  leaguesFetcher: service('fetchers/leagues-fetcher'),
  leagueSetting: service('settings/league-setting'),
  authenticationSetting: service('settings/authentication-setting'),

  currentLeagueSlug: readOnly('leagueSetting.league.slug'),
  currentPoesessid: readOnly('authenticationSetting.poesessid'),
  currentAccount: readOnly('authenticationSetting.account'),

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
  },

  applyPoesessid({target: {value}}) {
    this.authenticationSetting.applyPoesessid(value);
  },

  applyAccount({target: {value}}) {
    this.authenticationSetting.applyAccount(value);
  }
});
