// Vendor
import Service, {inject as service} from '@ember/service';

// Constants
import STORAGE_KEYS from 'poe-world/constants/storage-keys';

export default Service.extend({
  storage: service('storage'),

  destroy(trade) {
    if (!trade.id) return false;

    const trades = this.storage.getValue(STORAGE_KEYS.TRADE, {
      defaultValue: []
    });
    const initialLength = trades.length;

    const updatedTrades = trades.filter(({id}) => id !== trade.id);
    if (initialLength === updatedTrades.length) return false;

    this.storage.setValue(STORAGE_KEYS.TRADE, updatedTrades);
    return true;
  }
});

