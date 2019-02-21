// Vendor
import Component from '@ember/component';
import {argument} from '@ember-decorators/argument';
import {type} from '@ember-decorators/argument/type';
import {tagName} from '@ember-decorators/component';

@tagName('')
export default class TaskLoadContainer extends Component {
  @argument
  @type('object')
  task = null;
}
