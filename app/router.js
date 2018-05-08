import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const {locationType, rootURL, APP: {DEV_MODE}} = config;

const Router = EmberRouter.extend({
  location: locationType,
  rootURL
});

Router.map(function() {
  // Dev routes
  if (DEV_MODE) {
    this.route('atlas-offsets');
  }
  this.route('test');
});

export default Router;
