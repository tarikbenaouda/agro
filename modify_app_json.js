const fs = require('fs');
const json = JSON.parse(fs.readFileSync('app.json', 'utf8'));

if (!json.expo.android.config) {
  json.expo.android.config = {};
}
json.expo.android.config.googleMaps = {
  apiKey: "VOTRE_CLE_API_GOOGLE_MAPS_ICI"
};

fs.writeFileSync('app.json', JSON.stringify(json, null, 2));
