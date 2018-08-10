import Component from '@ember/component';
import {equal} from '@ember/object/computed';

export default Component.extend({
  title: '',
  isOpened: false,
  onClose: () => {},
  size: null,

  isLarge: equal('size', 'large'),
  isSmall: equal('size', 'small')
});
