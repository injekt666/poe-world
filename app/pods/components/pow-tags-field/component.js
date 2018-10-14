// Vendors
import Component from '@ember/component';

// Constants
import KEY_CODES from 'poe-world/constants/key-codes';

// Utilities
import uuid from 'poe-world/utilities/uuid';

export default Component.extend({
  tagName: '',

  label: null,
  placeholder: null,
  tags: [],

  newTag: '',

  willInsertElement() {
    this.set('id', uuid());
  },

  remove(tagToRemove) {
    this.tags.removeObject(tagToRemove);
  },

  newTagInputChange({target: {value}}) {
    this.set('newTag', value);
  },

  newTagInputKeydown({keyCode}) {
    if (![KEY_CODES.TAB, KEY_CODES.ENTER].includes(keyCode)) return true;

    this._confirmNewTag();
    return false;
  },

  newTagInputBlur() {
    this._confirmNewTag();
  },

  _confirmNewTag() {
    if (!this.newTag) return false;

    this.tags.pushObject(this.newTag);
    this.set('newTag', '');

    return true;
  }
});
