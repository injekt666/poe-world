import Service from '@ember/service';
import {task, timeout} from 'ember-concurrency';

// Constants
const SIDE_PANEL_WIDTH = 600;
const MAX_ZOOM = 1;
const MIN_ZOOM = 0.5;
const ZOOM_DURATION = 400;
const MOVE_DURATION = 500;

export default Service.extend({
  _panzoomRef: null,
  _mapToReframeOnInitialize: null,

  isReframing: false,

  mapReframingTask: task(function *(map) {
    const viewportCenterX = (window.innerWidth - SIDE_PANEL_WIDTH) / 2;
    const viewportCenterY = window.innerHeight / 2;
    const {scale: zoom} = this._panzoomRef.getTransform();

    this.set('isReframing', true);

    this._panzoomRef.smoothZoom(viewportCenterX, viewportCenterY, MAX_ZOOM / zoom);

    yield timeout(ZOOM_DURATION);

    const {x: panLeft, y: panTop} = this._panzoomRef.getTransform();

    const currentOffset = {
      x: map.offsetLeft - (panLeft * -1),
      y: map.offsetTop - (panTop * -1)
    };

    this._panzoomRef.moveBy(
      viewportCenterX - currentOffset.x,
      viewportCenterY - currentOffset.y,
      true
    );

    yield timeout(MOVE_DURATION);

    this.set('isReframing', false);
  }).restartable(),

  resetZoomTask: task(function *task() {
    const {scale: zoom} = this._panzoomRef.getTransform();
    this.set('isReframing', true);

    this._panzoomRef.smoothZoom(window.innerWidth / 2, window.innerHeight / 2, MIN_ZOOM / zoom);

    yield timeout(ZOOM_DURATION);

    this.set('isReframing', false);
  }).restartable(),

  initialize(panzoomRef) {
    this._panzoomRef = panzoomRef;

    if (!this._mapToReframeOnInitialize) return;

    this.reframeFor(this._mapToReframeOnInitialize);
    this._mapToReframeOnInitialize = null;
  },

  reframeFor(map) {
    if (!this._panzoomRef) return this._mapToReframeOnInitialize = map;

    this.mapReframingTask.perform(map);
  },

  resetMapZoom() {
    if (!this._panzoomRef) return;

    this.resetZoomTask.perform();
  }
});
