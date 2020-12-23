'use strict';

const fsExtra = require('fs-extra');
const path = require('path');
const recursiveReadDir = require('recursive-readdir');

async function flatToNested(rootDir) {
  try {
    let componentsDir = 'app/components';

    if (await isAddon(rootDir)) {
      componentsDir = 'addon/components';
    }

    const componentsDirFull = path.join(rootDir, componentsDir);
    const componentFiles = await recursiveReadDir(componentsDirFull);

    await Promise.all(componentFiles.map(flatToNestedComponent));

    console.log('Ember Flat to Nested ran successfully! 🎉');
  } catch (error) {
    console.log(error.message);
  }
}

function isAddon(rootDir) {
  return fsExtra.pathExists(path.join(rootDir, 'addon'));
}

function flatToNestedComponent(componentFile) {
  if (isNestedComponent(componentFile)) {
    return;
  }

  const [nestedComponentDir, nestedComponentExt] = componentFile.split('.');
  const nestedComponentFile = `${nestedComponentDir}/index.${nestedComponentExt}`;

  return fsExtra.move(componentFile, nestedComponentFile);
}

function isNestedComponent(componentFile) {
  return componentFile.includes('/index.');
}

module.exports = flatToNested;
