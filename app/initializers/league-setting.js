export default {
  initialize: (app) => {
    app.deferReadiness();

    app.__container__.lookup('service:settings/league-setting').initialize().then(() => app.advanceReadiness());
  }
};
