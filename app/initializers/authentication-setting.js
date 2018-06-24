export default {
  initialize: (app) => {
    app.__container__.lookup('service:settings/authentication-setting').initializeSync();
  }
};
