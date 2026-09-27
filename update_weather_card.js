const fs = require('fs');

const path = 'app/index.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '<View style={styles.weatherCard}>',
  '<TouchableOpacity style={styles.weatherCard} activeOpacity={0.8} onPress={() => router.push("/map")}>'
);

content = content.replace(
  '              <Text style={styles.locationText}>{weather.location}</Text>\n            </View>\n          </View>',
  '              <Text style={styles.locationText}>{weather.location}</Text>\n            </View>\n          </TouchableOpacity>'
);

fs.writeFileSync(path, content, 'utf8');
