import Component from '@ember/component';
import {computed} from '@ember/object';
import CURRENCIES from 'poe-world/constants/currencies';

export default Component.extend({
  tagName: '',

  amount: null,
  currencyId: null,

  roundedAmount: computed('amount', function() {
    return Math.floor(this.amount * 100) / 100;
  }),

  currency: computed('currencyId', function() {
    if (!CURRENCIES[this.currencyId]) return null;

    return CURRENCIES[this.currencyId];
  })
});
