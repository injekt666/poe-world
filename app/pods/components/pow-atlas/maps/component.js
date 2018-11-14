// Vendor
import Component from '@ember/component';

// Mixins
import Popoverable from 'poe-world/mixins/components/popoverable';

export default Component.extend(Popoverable, {
  classNames: ['list-unstyled'],
  tagName: 'ul',

  currentMap: null,
  maps: [],
  onMapClick: () => {}
});
