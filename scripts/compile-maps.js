const fs = require('fs');

// Cli params
const CLI_OVERRIDES = process.argv.length >= 3 ? JSON.parse(process.argv[2]) : {};

// Constants
const MAPS_PATH = './maps';
const WIKI_MAPS_PATH = './maps/_wiki.json';
const OUTPUT_ES6_PATH = './app/constants/maps.js';
const BASE_OVERRIDE = {
  offsetLeft: 0,
  offsetTop: 0
};

// Utils
const loadJsonFrom = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));

if (!fs.existsSync(WIKI_MAPS_PATH)) throw 'You need to "npm run fetch-maps-wiki" first to download the maps from the wiki.';

const wikiMaps = loadJsonFrom(WIKI_MAPS_PATH);

console.log('Compiling maps...')
const processedMaps = Object.keys(wikiMaps).reduce((processedMaps, mapId) => {
  const currentMapOverridePath = `${MAPS_PATH}/${mapId}.json`;
  let currentOverride = fs.existsSync(currentMapOverridePath) ? loadJsonFrom(currentMapOverridePath) : {};

  currentOverride = {
    ...BASE_OVERRIDE,
    ...currentOverride,
    ...CLI_OVERRIDES[mapId]
  };

  fs.writeFileSync(currentMapOverridePath, JSON.stringify(currentOverride, Object.keys(currentOverride).sort(), 2));

  processedMaps[mapId] = {
    ...wikiMaps[mapId],
    ...currentOverride
  }

  return processedMaps;
}, {});

console.log('Writing the output...');
fs.writeFileSync(OUTPUT_ES6_PATH, `export default ${JSON.stringify(processedMaps, null, 2)};`);
console.log('Good luck with your maps !');
