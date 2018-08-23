// Vendors
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  didInsertElement() {
    this._super(...arguments);

    this.$('[data-toggle="popover"]').popover({
      container: 'body',
      trigger: 'hover',
      html: true
    });
  }
});
