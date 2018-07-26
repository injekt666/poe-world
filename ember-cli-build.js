'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    babel: {
      plugins: ['transform-object-rest-spread']
    },
    fontawesome: {
      icons: {
        'free-solid-svg-icons': [
          'times', 'info', 'coins', 'compass', 'skull', 'balance-scale', 'spinner', 'sync', 'copy', 'check',
          'caret-right', 'minus', 'square', 'check-square', 'download', 'wrench'
        ],
        'free-brands-svg-icons': [
          'github'
        ]
      }
    },
    sassOptions: {
      includePaths: 'node_modules/bootstrap/scss'
    }
  });

  app.import('vendor/panzoom.js');
  app.import('node_modules/bootstrap/dist/js/bootstrap.js');

  return app.toTree();
};
