import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  router: service('router'),
  atlasReframer: service('reframers/atlas-reframer'),

  map: null,

  back() {
    this.atlasReframer.resetMapZoom();
    this.router.transitionTo('atlas');
  }
});
