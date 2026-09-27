const fs = require('fs');
let code = fs.readFileSync('app/map.tsx', 'utf8');

code = code.replace(
  "  map: {\n    width: '100%',\n    height: '100%',\n  },",
  "  map: {\n    ...StyleSheet.absoluteFillObject,\n  },"
);

fs.writeFileSync('app/map.tsx', code);
