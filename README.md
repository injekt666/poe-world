# PoeWorld

[![Build Status](https://travis-ci.com/poe-world/poe-world.svg?branch=master)](https://travis-ci.com/poe-world/poe-world)

![logo-bg](https://user-images.githubusercontent.com/4255460/49335132-4a588100-f5b5-11e8-8c6a-60a158e265b6.png)

PoeWorld is a desktop companion application for the game Path Of Exile.

Core features includes:
* Atlas information and map trading
* Stash summaries and visualisations
* Custom browser for pathofexile.com/trade

## Contributing

Here's what you will need in order to play with this Ember.js / Electron application.

### Requirements

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)
* [Hub](http://hub.github.com) (for releases)

### Application setup (desktop)

```sh
npm install # install npm dependencies
npm run start-electron # initiate the magic
```

### Tests

```sh
npm run test-desktop
npm run test-web
```

In order to view the results in a browser where tests can be filtered

```sh
ember test --server
```

### Lints

**Prettier**

```sh
npm run prettier
```

**Scripts lint**

```sh
npm run lint-scripts
```

**Templates lint**

```sh
npm run lint-templates
```

**Styles lint**

```sh
npm run lint-styles
```
