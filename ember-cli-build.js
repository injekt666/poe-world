'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    babel: {
      plugins: ['transform-object-rest-spread']
    },
    nodeAssets: {
      'simple-css-reset': {
        import: ['reset.css']
      }
    }
  });

  app.import('vendor/panzoom.js');

  return app.toTree();
};
