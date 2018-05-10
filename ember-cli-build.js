'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    nodeAssets: {
      'simple-css-reset': {
        import: ['reset.css']
      }
    }
  });

  return app.toTree();
};
