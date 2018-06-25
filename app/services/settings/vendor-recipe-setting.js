import Service, {inject as service} from '@ember/service';
import STORAGE_KEYS from 'pow/constants/storage-keys';

export default Service.extend({
  storage: service('storage'),
  leagueSetting: service('settings/league-setting'),

  stashIds: [],
  account: null,

  applyStashIds(stashIds) {
    this.set('stashIds', stashIds);
    this.storage.setValue(STORAGE_KEYS.VENDOR_RECIPE_STASH_IDS, stashIds, {
      leagueSlug: this.leagueSetting.league.slug
    });
  },

  initialize() {
    return this.leagueSetting.leaguePromise.then((activeLeague) => {
      this.set('stashIds', this.storage.getValue(STORAGE_KEYS.VENDOR_RECIPE_STASH_IDS, {
        defaultValue: [],
        leagueSlug: activeLeague.slug
      }));
    });
  }
});

