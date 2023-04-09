const fs = require('fs');

function reMapSodiumNative() {
  const packagesToRemap = [
    'sodium-universal',
    'sodium-secretstream',
    'hmac-blake2b',
  ];

  packagesToRemap.forEach(packageName => {
    const pathToPackageJSON = `../node_modules/${packageName}/package.json`;
    const packageJSON = require(pathToPackageJSON);

    const browser = packageJSON.browser || {};
    browser['sodium-native'] = 'sodium-javascript';

    packageJSON.browser = browser;

    fs.writeFile(
      `${__dirname}/${pathToPackageJSON}`,
      JSON.stringify(packageJSON, null, 2),
      function writeJSON(err) {
        if (err) {
          return console.log(err);
        }

        console.log(
          'remapped sodium-native to mobile version for "' + packageName + '"',
        );
      },
    );
  });
}

reMapSodiumNative();
