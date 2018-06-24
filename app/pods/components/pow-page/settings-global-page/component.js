import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {task, timeout} from 'ember-concurrency';
import {readOnly, equal} from '@ember/object/computed';

// Constants
const TEST_AUTHENTICATION_DEBOUNCE = 1000; // 1 second

export default Component.extend({
  leaguesFetcher: service('fetchers/leagues-fetcher'),
  leagueSetting: service('settings/league-setting'),
  authenticationSetting: service('settings/authentication-setting'),
  authenticationStateFetcher: service('fetchers/authentication-state-fetcher'),

  currentLeagueSlug: readOnly('leagueSetting.league.slug'),
  currentPoesessid: readOnly('authenticationSetting.poesessid'),
  currentAccount: readOnly('authenticationSetting.account'),

  leagues: [],
  isAuthenticated: null,

  leaguesLoadTask: task(function *() {
    const leagues = yield this.leaguesFetcher.fetch();
    this.set('leagues', leagues);
  }).drop(),

  debouncedTestAuthenticationTask: task(function *() {
    yield timeout(TEST_AUTHENTICATION_DEBOUNCE);
    yield this.testAuthenticationTask.perform();
  }).restartable(),

  testAuthenticationTask: task(function *() {
    try {
      yield this.authenticationStateFetcher.fetch();
      this.set('isAuthenticated', true);
    } catch (_error) {
      this.set('isAuthenticated', false);
    }
  }).drop(),

  willInsertElement() {
    this.leaguesLoadTask.perform();
    this.testAuthenticationTask.perform();
  },

  applyLeague(league) {
    this.leagueSetting.apply(league);
  },

  applyPoesessid(poesessid) {
    this.authenticationSetting.applyPoesessid(poesessid);
    this.debouncedTestAuthenticationTask.perform();
  },

  applyAccount(account) {
    this.authenticationSetting.applyAccount(account);
    this.debouncedTestAuthenticationTask.perform();
  }
});
