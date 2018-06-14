import EmberObject from '@ember/object';
import {computed} from '@ember/object';

// Constants
const YELLOW_TIER_MIN_TIER = 6;
const RED_TIER_MIN_TIER = 11;
const UNIQUE_RARITY = 'unique';

export default EmberObject.extend({
  id: null,
  name: null,
  wikiUrl: null,
  imageUrl: null,
  areaLevel: null,
  tier: null,
  type: null,
  layoutRating: null,
  bossRating: null,
  tileset: null,
  drops: [],
  offsetLeft: null,
  offsetTop: null,
  sextants: [],

  tierColor: computed('tier', function() {
    const tier = this.tier;

    if (!tier) return null;

    if (tier >= RED_TIER_MIN_TIER) return 'red';
    if (tier >= YELLOW_TIER_MIN_TIER) return 'yellow';
    return 'white';
  }),

  tradeName: computed('name', 'type', function() {
    const {name, type} = this.getProperties('name', 'type');
    if (type === UNIQUE_RARITY) return name;

    return `${name} Map`;
  })
});
