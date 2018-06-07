import Component from '@ember/component';
import {computed} from '@ember/object';

const LAYOUT_RATINGS_KEY = {
  A: 'components.page.map-information-page.layout_rating_A',
  B: 'components.page.map-information-page.layout_rating_B',
  C: 'components.page.map-information-page.layout_rating_C'
};

export default Component.extend({
  map: null,

  layoutRatingDescriptionKey: computed('map.layoutRating', function() {
    const layoutRating = this.get('map.layoutRating');
    if (!layoutRating || !LAYOUT_RATINGS_KEY[layoutRating]) return null;

    return LAYOUT_RATINGS_KEY[layoutRating];
  })
});
