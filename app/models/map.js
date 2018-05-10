import EmberObject from '@ember/object';

export default EmberObject.extend({
  id: null,
  name: null,
  wikiUrl: null,
  areaLevel: null,
  tier: null,
  type: null,
  layoutRating: null,
  bossRating: null,
  tileset: null,
  sextantCoverage: null,
  drops: [],
  offsetLeft: null,
  offsetTop: null
});
