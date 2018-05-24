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

  this.route('atlas', {path: '/'}, function() {
    this.route('map', {path: '/:slug'}, function() {
      this.route('information', {path: '/'});
      this.route('stash');
      this.route('friends');
      this.route('trade');
      this.route('stats');
    });
  });
});

export default Router;
