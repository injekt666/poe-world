import EmberObject from '@ember/object';
import {computed} from '@ember/object';

export default EmberObject.extend({
  id: null,
  name: null,

  slug: computed(function() {
    let slug = this.id.toLowerCase();
    slug = slug.replace(/[^a-z ]/g, '');
    slug = slug.replace(/ /g, '-');

    return slug;
  })
});
