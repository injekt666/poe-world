import Component from '@ember/component';
import {observer, computed} from '@ember/object';
import {bool, gt} from '@ember/object/computed';
import {htmlSafe} from '@ember/string';

// Constants
const ATLAS_WIDTH = 4096;

export default Component.extend({
  classNameBindings: ['isActive:atlas-popover--visible', 'isReversed:atlas-popover--reversed'],
  attributeBindings: ['style'],

  map: null,

  offsetTop: null,
  offsetLeft: null,

  isActive: bool('map'),

  isReversed: gt('map.offsetLeft', ATLAS_WIDTH / 2),

  style: computed('map', function() {
    const map = this.get('map');

    if (!map) return null;

    const {offsetTop, offsetLeft} = map;
    return htmlSafe(`top: ${offsetTop}px; left: ${offsetLeft}px;`);
  })
});
