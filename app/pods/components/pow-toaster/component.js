import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {readOnly} from '@ember/object/computed';

export default Component.extend({
  localClassNames: 'toaster',

  toaster: service('toaster'),

  toasts: readOnly('toaster.toasts')
});
