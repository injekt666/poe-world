// Vendor
import EmberObject, {computed} from '@ember/object';

export default EmberObject.extend({
  name: null,
  slug: null,
  imageUrl: null,
  itemLevel: null,
  topCategory: null,
  subCategories: null,
  rarity: null,
  identified: null,
  socketCount: null,
  socketGroups: null,
  quantity: null,
  maxStackSize: null,
  explicitMods: null,

  defaultCategory: computed('subCategories', function() {
    if (this.subCategories.length > 0) return this.subCategories[0];
    return null;
  })
});
