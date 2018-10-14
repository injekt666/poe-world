// Vendors
import Service, {inject as service} from '@ember/service';

// Utilities
import uuid from 'poe-world/utilities/uuid';

// Constants
import STORAGE_KEYS from 'poe-world/constants/storage-keys';

export default Service.extend({
  storage: service('storage'),
  tradeFetcher: service('trade/fetcher'),

  persist(trade) {
    if (!trade.id) trade.set('id', uuid());

    const trades = this.tradeFetcher.fetchAll();
    const existingTrade = trades.find(({id}) => id === trade.id);

    if (existingTrade) {
      Object.assign(existingTrade, trade.asJson());
    } else {
      trades.unshift(trade.asJson());
    }

    this.storage.setValue(STORAGE_KEYS.TRADE, trades);

    return trade;
  }
});

