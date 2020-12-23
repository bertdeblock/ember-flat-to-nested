'use strict';

const fileExists = require('@kwsites/file-exists');
const fs = require('fs');
const path = require('path');
const recursiveReadDir = require('recursive-readdir');

async function flatToNested(rootDir) {
  try {
    let componentsDir = 'app/components';

    if (isAddon(rootDir)) {
      componentsDir = 'addon/components';
    }

    const componentsDirFull = path.join(rootDir, componentsDir);
    const componentFiles = await recursiveReadDir(componentsDirFull);

    componentFiles.forEach(flatToNestedComponent);

    console.log('Ember Flat to Nested ran successfully! 🎉');
  } catch (error) {
    console.log(error.message);
  }
}

function isAddon(rootDir) {
  return fileExists.exists(path.join(rootDir, 'addon'), fileExists.FOLDER);
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
