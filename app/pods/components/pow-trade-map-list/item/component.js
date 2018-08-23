import Component from '@ember/component';
import {or} from '@ember/object/computed';

export default Component.extend({
  classNames: ['list-group-item'],
  tagName: 'li',

  tradeMap: null,

  hasProperties: or('tradeMap.itemQuantity', 'tradeMap.itemRarity', 'tradeMap.monsterPackSize', 'tradeMap.corrupted'),
  hasExplicitMods: or('tradeMap.isUnidentified', 'tradeMap.explicitMods')
});
