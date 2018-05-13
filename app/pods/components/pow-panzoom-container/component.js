import Component from '@ember/component';
import {task, timeout} from 'ember-concurrency';

// Constants
const PANZOOM_EVENT_DEBOUNCE = 50;

export default Component.extend({
  onPanzoom: () => {},
  minZoom: 1,
  maxZoom: 1,
  zoomSpeed: 0.05,
  bounds: true,
  autocenter: true,
  smoothScroll: false,

  triggerPanzoomEventTask: task(function *(target) {
    this.onPanzoom(this._extractZoomStateFor(target));
    yield timeout(PANZOOM_EVENT_DEBOUNCE);
    this.onPanzoom(this._extractZoomStateFor(target));
  }).restartable(),

  didInsertElement() {
    const $container = this.$();
    panzoom($container[0], this.getProperties('minZoom', 'maxZoom', 'zoomSpeed', 'bounds', 'autocenter', 'smoothScroll'));

    $container.on('pan panstart panend zoom', (event) => this.triggerPanzoomEventTask.perform(event.target));
  },

  _extractZoomStateFor(target) {
    const [_match, zoom, panLeft, panTop] = target.style['transform'].match(/^matrix\((.+)\,.+\, (.+)\, (.+)\)$/);

    return {
      zoom: parseFloat(zoom, 10),
      panTop: parseInt(panTop, 10),
      panLeft: parseInt(panLeft, 10)
    };
  }
});
