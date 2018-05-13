import Component from '@ember/component';
import {observer, computed} from '@ember/object';
import {bool, gt} from '@ember/object/computed';
import {htmlSafe} from '@ember/string';

// Constants
const POPOVER_MARGIN = 35;
const POPOVER_WIDTH = 400;

export default Component.extend({
  classNameBindings: ['isActive:atlas-popover--visible', 'isReversed:atlas-popover--reversed'],
  attributeBindings: ['style'],

  map: null,

  zoom: 1,
  panTop: 0,
  panLeft: 0,

  isActive: bool('map'),

  isReversed: gt('offsetLeft', window.innerWidth / 2),

  offsetTop: computed('map', 'panTop', 'zoom', function() {
    const {map, panTop, zoom} = this.getProperties('map', 'panTop', 'zoom');
    if (!map) return 0;

    return map.offsetTop * zoom + panTop;
  }),

  offsetLeft: computed('map', 'panLeft', 'zoom', function() {
    const {map, panLeft, zoom} = this.getProperties('map', 'panLeft', 'zoom');
    if (!map) return 0;

    return map.offsetLeft * zoom + panLeft;
  }),

  marginLeft: computed('zoom', 'isReversed', function() {
    const {zoom, isReversed} = this.getProperties('zoom', 'isReversed');

    if (!isReversed) return POPOVER_MARGIN * zoom;
    return -1 * POPOVER_WIDTH - POPOVER_MARGIN * zoom;
  }),

  style: computed('offsetTop', 'offsetLeft', 'marginLeft', function() {
    const {offsetTop, offsetLeft, marginLeft} = this.getProperties('offsetTop', 'offsetLeft', 'marginLeft');
    return htmlSafe(`top: ${offsetTop}px; left: ${offsetLeft}px; margin-left: ${marginLeft}px;`);
  })
});
