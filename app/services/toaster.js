import Service, {inject as service} from '@ember/service';

/* global toastr */

export default Service.extend({
  i18n: service('i18n'),

  toastUnexpectedError() {
    const genericMessage = this.i18n.t('services.toaster.unexpected_error').string;
    this.toastError(genericMessage);
  },

  toastError(message) {
    toastr.error(message);
  }
});
