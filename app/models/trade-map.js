import EmberObject from '@ember/object';

export default EmberObject.extend({
  id: null,

  // Map attributes
  rarity: null,
  corrupted: null,
  identified: null,
  verified: null,
  mods: null,
  itemQuantity: null,
  itemRarity: null,
  monsterPackSize: null,

  // Listing information
  indexedAt: null,
  whisper: null,
  account: null,
  priceAmount: null,
  priceCurrency: null
});
