const https = require('https');
const fs = require('fs');

// Constants
const QUERY_FIELDS = 'name,tier,area_level,rarity';
const API_CALL_URL = `https://pathofexile.gamepedia.com/api.php?action=cargoquery&tables=items,maps&join_on=items._pageID=maps._pageID&fields=${QUERY_FIELDS}&where=class="Maps" AND drop_enabled="1"&limit=500&format=json`;
const MAPS_PATH = 'maps';
const BASE_TEMPLATE = '_base.json';
const ES6_MODULE_PATH = 'app/constants/maps.js';

// Utils
const loadJsonFrom = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));

const baseOverride = loadJsonFrom(`${MAPS_PATH}/${BASE_TEMPLATE}`);

// Get or initialize an override map document
const updateOverrideFor = (mapId) => {
  const targetPath = `${MAPS_PATH}/${mapId}.json`;

  const override = {
    ...baseOverride,
    ...(fs.existsSync(targetPath) ? loadJsonFrom(targetPath) : {})
  };

  fs.writeFileSync(targetPath, JSON.stringify(override, null, 2));
  console.log('Updated', targetPath);

  return override;
};

// Parse a map document from the wiki
const parse = (map) => {
  const id = map['name'].toLowerCase().replace(/ /g, '-').replace(/[^a-z\-]/g, '').replace(/\-map$/, '');

  const baseDocument = {
    id,
    name: map['name'],
    tier: parseInt(map['tier'], 10),
    areaLevel: parseInt(map['area level'], 10),
    rarity: map['rarity'].toLowerCase()
  };

  const updatedOverride = updateOverrideFor(id);

  return {
    ...baseDocument,
    ...updatedOverride
  };
};

console.log('Fetching maps from the wiki...');
https.get(API_CALL_URL, (response) => {
  let data = '';

  response.on('data', (chunk) => data += chunk);

  response.on('end', () => {
    console.log('Parsing...');
    const mapHash = JSON.parse(data).cargoquery.reduce((mapHash, cargoqueryItem) => {
      const parsedMap = parse(cargoqueryItem.title);
      mapHash[parsedMap.id] = parsedMap;
      return mapHash;
    }, {});

    fs.writeFileSync(ES6_MODULE_PATH, `export default ${JSON.stringify(mapHash)};`);

    console.log(`\nParsed ${Object.keys(mapHash).length} maps\n`);
    console.log('Good luck with your maps...');
  });
}).on("error", (error) => {
  console.log("Error: " + error.message);
});
