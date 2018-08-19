export default {
  after: 'league-setting',

  initialize: (app) => {
    app.deferReadiness();

    app.__container__.lookup('service:settings/divination-summary-setting').initialize().then(() => app.advanceReadiness());
  }
};
