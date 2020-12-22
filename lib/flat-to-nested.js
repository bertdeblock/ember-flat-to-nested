const fs = require('fs');
const path = require('path');
const recursiveReadDir = require('recursive-readdir');

function flatToNested(rootDir) {
  const package = readPackageFile(rootDir);
  const isAddon = Boolean(package['ember-addon']);
  const componentsDir = isAddon ? 'addon/components' : 'app/components';
  const componentsDirFull = path.join(rootDir, componentsDir);

  recursiveReadDir(componentsDirFull, function (error, componentFiles) {
    if (error) {
      console.log(error.message);
    } else {
      componentFiles.forEach(flatToNestedComponent);
    }
  });
}

function readPackageFile(rootDir) {
  const packageFile = fs.readFileSync(path.join(rootDir, 'package.json'));

  return JSON.parse(packageFile);
}

function flatToNestedComponent(componentFile) {
  if (isNestedComponent(componentFile)) {
    return;
  }

  const [nestedComponentDir, nestedComponentExt] = componentFile.split('.');
  const nestedComponentFile = `${nestedComponentDir}/index.${nestedComponentExt}`;

  fs.mkdirSync(nestedComponentDir, { recursive: true });
  fs.renameSync(componentFile, nestedComponentFile);
}

function isNestedComponent(componentFile) {
  return componentFile.includes('/index.');
}

module.exports = flatToNested;
