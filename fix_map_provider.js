const fs = require('fs');
let code = fs.readFileSync('app/map.tsx', 'utf8');

if (!code.includes('PROVIDER_GOOGLE')) {
  code = code.replace(
    "import MapView, { Marker, Region, MapPressEvent } from 'react-native-maps';",
    "import MapView, { Marker, Region, MapPressEvent, PROVIDER_GOOGLE } from 'react-native-maps';"
  );
  code = code.replace(
    "<MapView\n          style={styles.map}",
    "<MapView\n          provider={PROVIDER_GOOGLE}\n          style={styles.map}"
  );
  fs.writeFileSync('app/map.tsx', code);
}
