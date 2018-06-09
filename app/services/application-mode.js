import Service from '@ember/service';

export default Service.extend({
  isDesktop() {
    return true;
  },

  isWeb() {
    return !this.isDesktop();
  }
});
