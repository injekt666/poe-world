import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  applicationMode: service('application-mode'),
  electronUrlOpener: service('electron/url-opener'),

  tagName: 'a',

  url: '',

  click(event) {
    event.preventDefault();
    const {url, applicationMode, electronUrlOpener} = this.getProperties('url', 'applicationMode', 'electronUrlOpener');

    if (applicationMode.isWeb()) return window.open(url, '_blank').focus();

    electronUrlOpener.open(url);
  }
});
