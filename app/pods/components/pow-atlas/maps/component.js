import Component from '@ember/component';

export default Component.extend({
  tagName: 'ul',

  currentMap: null,
  maps: [],
  onMapEnter: () => {},
  onMapLeave: () => {},
  onMapClick: () => {}
});
