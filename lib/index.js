'use strict';

const fsExtra = require('fs-extra');
const path = require('path');
const recursiveReadDir = require('recursive-readdir');

const COMPONENT_DIR = {
  ADDON: 'addon/components',
  APP: 'app/components',
};

async function flatToNested(rootDir) {
  try {
    const componentDirAppFull = await getFullComponentDir(
      rootDir,
      COMPONENT_DIR.APP
    );

    const componentDirAddonFull = await getFullComponentDir(
      rootDir,
      COMPONENT_DIR.ADDON
    );

    let componentDir;
    let componentDirFull;

    if (componentDirAddonFull) {
      componentDir = COMPONENT_DIR.ADDON;
      componentDirFull = componentDirAddonFull;
    } else if (componentDirAppFull) {
      componentDir = COMPONENT_DIR.APP;
      componentDirFull = componentDirAppFull;
    } else {
      throw new Error(
        `ember-flat-to-nested: "${COMPONENT_DIR.APP}" or "${COMPONENT_DIR.ADDON}" directory not found.`
      );
    }

    const componentFiles = await recursiveReadDir(componentDirFull);

    await Promise.all(componentFiles.map(flatToNestedComponent));

    console.log(
      `ember-flat-to-nested: "${componentDir}" was successfully transformed to a nested structure.`
    );
  } catch (error) {
    console.error(error.stack);
  }
}

async function getFullComponentDir(rootDir, componentDir) {
  const componentDirFull = path.join(rootDir, componentDir);
  const componentDirFullExists = await fsExtra.pathExists(componentDirFull);

  if (componentDirFullExists) {
    return componentDirFull;
  }

  return null;
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
