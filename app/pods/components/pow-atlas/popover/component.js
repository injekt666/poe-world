import Component from '@ember/component';
import {computed} from '@ember/object';
import {bool, gt, not, and} from '@ember/object/computed';
import {htmlSafe} from '@ember/string';
import {inject as service} from '@ember/service';

// Constants
const POPOVER_MARGIN = 45;
const POPOVER_WIDTH = 400;

export default Component.extend({
  atlasReframer: service('reframers/atlas-reframer'),

  classNameBindings: ['isActive:atlas-popover--visible', 'isReversed:atlas-popover--reversed'],
  attributeBindings: ['style'],

  map: null,

  zoom: 1,
  panTop: 0,
  panLeft: 0,

  hasMap: bool('map'),
  isNotReframing: not('atlasReframer.isReframing'),
  isActive: and('hasMap', 'isNotReframing'),

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
