import EmberObject, {computed} from '@ember/object';

export default EmberObject.extend({
  imageUrl: null,
  itemLevel: null,
  topCategory: null,
  subCategories: [],
  rarity: null,
  identified: null,
  socketCount: null,
  socketGroups: [],

  defaultCategory: computed('subCategories', function() {
    if (this.subCategories.length > 0) return this.subCategories[0];
    return null;
  })
});
