// Vendor
import Component from '@ember/component';

export default Component.extend({
  placement: 'auto',
  title: '',

  didInsertElement() {
    this.$().tooltip({
      placement: this.placement,
      title: this.title.toString()
    });
  }
});
