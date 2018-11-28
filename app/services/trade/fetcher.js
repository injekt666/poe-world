// Vendor
import Service, {inject as service} from '@ember/service';

// Constants
import STORAGE_KEYS from 'poe-world/constants/storage-keys';

// Models
import Trade from 'poe-world/models/trade';

export default Service.extend({
  storage: service('storage'),

  fetchAll() {
    const rawTrades = this.storage.getValue(STORAGE_KEYS.TRADE, {
      defaultValue: []
    });

    return rawTrades.map(rawTrade => Trade.create(rawTrade));
  }
});
