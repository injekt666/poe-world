// Vendor
import Service from '@ember/service';

// Utilities
import substringSearch from 'poe-world/utilities/substring-search';

export default Service.extend({
  filter(trades, searchValue) {
    return trades.filter((trade) => {
      return searchValue.split(',').every((subSearchValue) => {
        if (substringSearch(trade.label, subSearchValue)) return true;
        if (trade.tags.toArray().some((tag) => substringSearch(tag, subSearchValue))) return true;

        return false;
      });
    });
  }
});

