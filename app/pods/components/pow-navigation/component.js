import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {readOnly} from '@ember/object/computed';

export default Component.extend({
  leagueSetting: service('settings/league-setting'),

  tagName: 'nav',

  leagueName: readOnly('leagueSetting.league.name')
});
