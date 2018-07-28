import Component from '@ember/component';

export default Component.extend({
  classNames: ['list-unstyled'],
  tagName: 'ul',

  currentMap: null,
  maps: [],
  onMapClick: () => {},

  didInsertElement() {
    this.$('[data-toggle="popover"]').popover({
      container: 'body',
      trigger: 'hover',
      html: true
    });
  }
});
