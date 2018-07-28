import Component from '@ember/component';
import {computed} from '@ember/object';
import CURRENCIES from 'poe-world/constants/currencies';

export default Component.extend({
  classNames: ['d-inline-flex', 'align-items-center'],

  amount: null,
  currencyId: null,

  currency: computed('currencyId', function() {
    if (!CURRENCIES[this.currencyId]) return null;

    return CURRENCIES[this.currencyId];
  })
});
