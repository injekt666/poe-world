/* eslint-disable */
const path = require('path');

module.exports = {
  make_targets: {
    win32: ['squirrel']
  },
  electronPackagerConfig: {
    appCopyright: `Copyright (c) 2017-${(new Date().getFullYear())} PoeWorld`,
    name: 'PoeWorld',
    versionString: {
      CompanyName: 'PoeWorld',
      FileDescription: 'for Desktop',
      ProductName: 'PoeWorld',
      InternalName: 'PoeWorld'
    },
    protocols: [
      {
        name: 'PoeWorld Desktop',
        schemes: ['poe-world']
      }
    ],
    protocol: ['poe-world'],
    protocolName: 'PoeWorld Desktop',
    overwrite: true,
    icon: 'ember-electron/assets/icons/poe-world'
  },
  electronWinstallerConfig: {
    name: 'PoeWorld',
    icon: 'ember-electron/assets/icons/poe-world',
    noMsi: true,
    authors: 'PoeWorld',
    exe: 'PoeWorld.exe',
    iconUrl: 'https://raw.githubusercontent.com/poe-world/poe-world/master/ember-electron/assets/icons/poe-world.ico',
    setupIcon: path.join(__dirname, 'assets/icons/poe-world.ico'),
    title: 'PoeWorld',
    noMsi: true,
    loadingGif: path.join(__dirname, 'assets/win32/installer.gif')
  }
};
/* eslint-enable */
