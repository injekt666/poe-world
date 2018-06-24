import Service from '@ember/service';

export default Service.extend({
  isDesktop: true,
  isWeb: false,

  isAuthenticated: null,

  flagAsAuthenticated() {
    this.set('isAuthenticated', true);
  },

  flagAsUnauthenticated() {
    this.set('isAuthenticated', false);
  }
});
