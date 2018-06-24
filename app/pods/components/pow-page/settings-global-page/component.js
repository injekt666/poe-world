import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {task, timeout} from 'ember-concurrency';
import {readOnly} from '@ember/object/computed';
import STORAGE_KEYS from 'pow/constants/storage-keys';

// Constants
const INPUT_DEBOUNCE_DELAY = 500;
const INPUT_CONFIRMATION_DELAY = 1000;

export default Component.extend({
  leaguesFetcher: service('fetchers/leagues-fetcher'),
  leagueSetting: service('settings/league-setting'),
  storage: service('storage'),

  currentLeagueSlug: readOnly('leagueSetting.league.slug'),
  currentSessionId: '',

  leagues: [],
  isSessionIdConfirmed: false,

  leaguesLoadTask: task(function *() {
    const leagues = yield this.leaguesFetcher.fetch();
    this.set('leagues', leagues);
  }).drop(),

  applySessionIdTask: task(function *(poesessid) {
    this.set('isSessionIdConfirmed', false);

    yield timeout(INPUT_DEBOUNCE_DELAY);

    this.storage.setValue(STORAGE_KEYS.POESESSID, poesessid);
    this.set('isSessionIdConfirmed', true);

    yield timeout(INPUT_CONFIRMATION_DELAY);

    this.set('isSessionIdConfirmed', false);
  }).restartable(),

  willInsertElement() {
    this.leaguesLoadTask.perform();
    this.set('currentSessionId', this.storage.getValue(STORAGE_KEYS.POESESSID, {defaultValue: ''}));
  },

  applyLeague(league) {
    this.leagueSetting.apply(league);
  },

  applySessionId({target: {value}}) {
    this.applySessionIdTask.perform(value);
  }
});
