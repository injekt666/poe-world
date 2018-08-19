import Service, {inject as service} from '@ember/service';

export default Service.extend({
  storage: service('storage'),
  leagueSetting: service('settings/league-setting'),

  storageKey: null,
  stashIds: [],

  applyStashIds(stashIds) {
    this.set('stashIds', stashIds);
    this.storage.setValue(this.storageKey, stashIds, {
      leagueSlug: this.leagueSetting.league.slug
    });
  },

  initialize() {
    return this.leagueSetting.leaguePromise.then((activeLeague) => {
      this.set('stashIds', this.storage.getValue(this.storageKey, {
        defaultValue: [],
        leagueSlug: activeLeague.slug
      }));
    });
  }
});

