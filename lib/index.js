"use strict";

const chalk = require("chalk");
const fsExtra = require("fs-extra");
const path = require("path");
const recursiveReadDir = require("recursive-readdir");

const COMPONENT_DIR = {
  ADDON: "addon/components",
  APP: "app/components",
};

async function flatToNested(rootDir, { revert = false } = {}) {
  try {
    const componentDirAppFull = await getFullComponentDir(
      rootDir,
      COMPONENT_DIR.APP,
    );
    const componentDirAddonFull = await getFullComponentDir(
      rootDir,
      COMPONENT_DIR.ADDON,
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
        `"${COMPONENT_DIR.APP}" or "${COMPONENT_DIR.ADDON}" directory not found.`,
      );
    }

    const componentFiles = await recursiveReadDir(componentDirFull);

    if (revert) {
      await Promise.all(componentFiles.map(nestedToFlatComponent));
      success(
        `"${componentDir}" was successfully transformed to a flat structure.`,
      );
    } else {
      await Promise.all(componentFiles.map(flatToNestedComponent));
      success(
        `"${componentDir}" was successfully transformed to a nested structure.`,
      );
    }
  } catch (exception) {
    error(exception.message);
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
  const componentData = path.parse(componentFile);
  const isNestedComponent = componentData.name === "index";

  if (isNestedComponent) {
    return;
  }

  const nestedComponentFile = path.format({
    dir: path.join(componentData.dir, componentData.name),
    ext: componentData.ext,
    name: "index",
  });

  return fsExtra.move(componentFile, nestedComponentFile);
}

function nestedToFlatComponent(componentFile) {
  const componentData = path.parse(componentFile);
  const isFlatComponent = componentData.name !== "index";

  if (isFlatComponent) {
    return;
  }

  const flatComponentFile = componentData.dir + componentData.ext;

  return fsExtra.move(componentFile, flatComponentFile);
}

function success(message) {
  console.log(chalk.green(`ember-flat-to-nested: ${message}`));
}

function error(message) {
  console.log(chalk.red(`ember-flat-to-nested: ${message}`));
}

module.exports = flatToNested;
