// Vendor
import Component from '@ember/component';
import { computed } from '@ember/object';

// Constants
const RARITY_REGEX = /\<(\w+)\>\{(.+)\}/; // <uniqueitem>{Sire of Shards}

export default Component.extend({
  tagName: '',

  mod: '',

  name: computed('mod', function() {
    if (!RARITY_REGEX.test(this.mod)) return this.mod;

    let name = this.mod.match(RARITY_REGEX)[2];
    name = name.replace(/\<[^\<\>]+\>/g, '');
    name = name.replace(/[\{\}]/g, '');

    return name;
  }),

  rarity: computed('mod', function() {
    if (!RARITY_REGEX.test(this.mod)) return null;

    return this.mod.match(RARITY_REGEX)[1];
  })
});
