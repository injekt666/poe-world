import Service from '@ember/service';
import {task, timeout} from 'ember-concurrency';

// Constants
const ATLAS_WIDTH = 4096;
const ATLAS_HEIGHT = 2304;
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
    const viewportCenterX = window.innerWidth / 2;
    const remainingViewportCenterX = (window.innerWidth - SIDE_PANEL_WIDTH) / 2;
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
      remainingViewportCenterX - currentOffset.x,
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

  initializeFrameTask: task(function *task(initialMap) {
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    this._panzoomRef.moveBy(
      viewportCenterX - ATLAS_WIDTH / 2,
      viewportCenterY - ATLAS_HEIGHT / 2,
      false
    );

    this._panzoomRef.zoomAbs(
      viewportCenterX,
      viewportCenterY,
      MIN_ZOOM
    );

    if (!initialMap) return;

    yield timeout(ZOOM_DURATION)

    yield this.mapReframingTask.perform(initialMap);
  }).restartable(),

  initialize(panzoomRef) {
    this._panzoomRef = panzoomRef;

    this.initializeFrameTask.perform(this._mapToReframeOnInitialize);
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
