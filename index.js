#!/usr/bin/env node

const fs = require('fs');
const recursiveReadDir = require('recursive-readdir');

const packageFile = fs.readFileSync('package.json');
const packageJson = JSON.parse(packageFile);

const isAddon = Boolean(packageJson['ember-addon']);
const componentsDir = isAddon ? 'addon/components' : 'app/components';

recursiveReadDir(componentsDir, function (error, componentFiles) {
  if (error) {
    console.log(error.message);
  } else {
    componentFiles.forEach(flatToNestedComponent);
  }
});

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
