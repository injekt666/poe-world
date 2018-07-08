import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  activate() {
    Ember.$('body').addClass('scroll-lock');
  },

  deactivate() {
    Ember.$('body').removeClass('scroll-lock');
  }
});
