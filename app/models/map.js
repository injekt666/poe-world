import EmberObject from '@ember/object';
import {computed} from '@ember/object';

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

    if (tier >= 11) return 'red';
    if (tier >= 6) return 'yellow';
    return 'white';
  })
});
