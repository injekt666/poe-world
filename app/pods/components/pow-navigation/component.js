import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {readOnly} from '@ember/object/computed';

export default Component.extend({
  classNames: ['navbar', 'fixed-top', 'navbar-dark', 'bg-dark', 'navbar-expand-md'],
  tagName: 'nav',

  leagueSetting: service('settings/league-setting'),

  leagueName: readOnly('leagueSetting.league.name')
});
