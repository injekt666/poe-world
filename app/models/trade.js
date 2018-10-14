// Vendors
import EmberObject from '@ember/object';
import {A} from '@ember/array';
import moment from 'moment';

export default EmberObject.extend({
  id: null,
  label: '',
  notes: '',
  slug: '',
  tags: [],
  updatedAt: null,

  init() {
    this.set('tags', A(this.tags));
  },

  updateProperties(properties) {
    this.setProperties({
      ...properties,
      updatedAt: moment().toISOString()
    });
  },

  clone() {
    const tradeJson = this.asJson();

    return this.constructor.create({
      ...tradeJson,
      tags: A(tradeJson.tags)
    });
  },

  asJson() {
    return {
      ...this.getProperties('id', 'label', 'notes', 'slug', 'updatedAt'),
      tags: this.tags.toArray()
    };
  }
});
