'use strict';

const npmPackage = require('../package.json');
const fs = require('fs');

module.exports = function(environment) {
  const ENV = {
    modulePrefix: 'poe-world',
    podModulePrefix: 'poe-world/pods',
    environment,
    rootURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    i18n: {
      defaultLocale: 'en'
    },

    viewportConfig: {
      viewportSpy: true
    },

    APP: {
      DEV_MODE: Boolean(process.env.DEV_MODE),
      VERSION: npmPackage.version,
      CHANGELOG: fs.readFileSync(`./changelogs/${npmPackage.version.replace(/\./g, '_')}.md`, 'utf-8')
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
