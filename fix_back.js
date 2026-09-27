const fs = require('fs');

function fixBackButton(file) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(
    'onPress={() => router.back()}',
    'onPress={() => router.canGoBack() ? router.back() : router.replace("/")}'
  );
  fs.writeFileSync(file, code);
}

fixBackButton('app/profile.tsx');
fixBackButton('app/alertes.tsx');

