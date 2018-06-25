import Service, {inject as service} from '@ember/service';
import StashItem from 'pow/models/stash-item';
import {Promise} from 'rsvp';
import PRIVATE_API from 'pow/constants/private-api';
import FRAME_TYPES from 'pow/constants/frame-types';

// Constants
const MAXIMUM_SOCKETS_COUNT = 6;

export default Service.extend({
  electronRequest: service('electron/request'),
  authenticationSetting: service('settings/authentication-setting'),
  leagueSetting: service('settings/league-setting'),
  globalState: service('global-state'),

  fetchFromStashIndex(stashIndex) {
    const leagueId = this.leagueSetting.league.id;
    const account = this.authenticationSetting.account;

    if (!this.globalState.isElectron || !account) return Promise.reject(null);

    return this.electronRequest.fetch(`${PRIVATE_API.CHARACTER_WINDOW_BASE_URL}/get-stash-items?accountName=${account}&league=${leagueId}&tabIndex=${stashIndex}`)
      .then(({items: rawStashItems}) => this._buildStashItems(rawStashItems));
  },

  _buildStashItems(rawStashItems) {
    return rawStashItems.map((rawStashItem) => {
      const [topCategory, subCategories] = this._getTypesFrom(rawStashItem);

      return StashItem.create({
        imageUrl: rawStashItem.icon,
        itemLevel: rawStashItem.ilvl,
        topCategory,
        subCategories,
        rarity: FRAME_TYPES[rawStashItem.frameType],
        identified: rawStashItem.identified,
        socketCount: rawStashItem.sockets ? rawStashItem.sockets.length : 0,
        socketGroups: this._getSocketGroupsFor(rawStashItem)
      });
    });
  },

  _getSocketGroupsFor(rawStashItem) {
    if (!rawStashItem.sockets) return [];

    const allSocketGroups = rawStashItem.sockets.reduce((groups, {group, sColour}) => {
      groups[group] += sColour;
      return groups;
    }, Array(MAXIMUM_SOCKETS_COUNT).fill(''));

    return allSocketGroups.filter((socketGroup) => socketGroup.length > 0);
  },

  _getTypesFrom(rawStashItem) {
    const topCategories = Object.keys(rawStashItem.category);
    if (topCategories.length === 0) return [null, []];

    const subCategories = rawStashItem.category[topCategories[0]];
    if (subCategories.length === 0) return [topCategories[0], []];

    return [topCategories[0], subCategories];
  }
});
