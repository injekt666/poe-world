import Component from '@ember/component';
import uuid from 'pow/utilities/uuid';

export default Component.extend({
  label: null,
  value: null,
  onChange: () => {},

  id: null,

  willInsertElement() {
    this.set('id', uuid());
  },

  inputChange({target: {value}}) {
    this.onChange(value);
  }
});
