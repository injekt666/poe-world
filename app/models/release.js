import EmberObject from '@ember/object';

export default EmberObject.extend({
  version: null,
  publishedAt: null,
  githubReleaseUrl: null,
  windowsDownloadUrl: null,
  changelog: null
});
