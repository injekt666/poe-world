import Component from '@ember/component';
import {equal} from '@ember/object/computed';
import {observer} from '@ember/object';

export default Component.extend({
  title: '',
  isOpened: false,
  onClose: () => {},
  size: null,

  isLarge: equal('size', 'large'),
  isSmall: equal('size', 'small'),

  openedStateObserver: observer('isOpened', function() {
    if (this.isOpened) return this.$('[data-toggle="modal"]').modal('show');
    return this.$('[data-toggle="modal"]').modal('hide');
  }),

  didInsertElement() {
    this.$('[data-toggle="modal"]')
      .modal({
        backdrop: true,
        keyboard: true,
        focus: false,
        show: this.isOpened
      })
      .on('hidden.bs.modal', function() {
        if (this.isOpened) this.onClose();
      });
  }
});
