import Component from '@ember/component';
import {readOnly} from '@ember/object/computed';
import {inject as service} from '@ember/service';

export default Component.extend({
  globalState: service('global-state'),

  isDesktop: readOnly('globalState.isDesktop')
});
