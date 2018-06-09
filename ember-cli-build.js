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
    },
    fontawesome: {
      icons: {
        'free-solid-svg-icons': [
          'times', 'info', 'coins', 'compass', 'skull'
        ]
      }
    }
  });

  app.import('vendor/panzoom.js');

  return app.toTree();
};
