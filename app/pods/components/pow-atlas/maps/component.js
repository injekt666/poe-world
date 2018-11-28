// Vendor
import Component from '@ember/component';

export default Component.extend({
  classNames: ['list-unstyled'],
  tagName: 'ul',

  currentMap: null,
  maps: null,
  onMapClick: () => {}
});
