import chalk from "chalk";
import fsExtra from "fs-extra";
import path from "node:path";
import recursiveReadDir from "recursive-readdir";

const COMPONENT_DIRS = ["addon/components", "app/components", "src/components"];

export async function flatToNested(rootDir, { revert = false } = {}) {
  try {
    let componentDir;
    let componentDirFull;

    for (const COMPONENT_DIR of COMPONENT_DIRS) {
      componentDir = COMPONENT_DIR;
      componentDirFull = await getFullComponentDir(rootDir, COMPONENT_DIR);

      if (componentDirFull) {
        break;
      }
    }

    if (componentDirFull === null) {
      const componentDirsList = COMPONENT_DIRS.map((dir) => `  - ${dir}`).join(
        "\n",
      );

      throw new Error(
        `Could not find a supported component directory.\n\nSupported component directories:\n${componentDirsList}`,
      );
    }

    const componentFiles = await recursiveReadDir(componentDirFull);

    if (revert) {
      await Promise.all(componentFiles.map(nestedToFlatComponent));
      success(
        `\`${componentDir}\` was successfully transformed to a flat structure.`,
      );
    } else {
      await Promise.all(componentFiles.map(flatToNestedComponent));
      success(
        `\`${componentDir}\` was successfully transformed to a nested structure.`,
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
  console.log(chalk.green(`${chalk.inverse(" SUCCESS ")} ${message}`));
}

function error(message) {
  console.error(chalk.red(`${chalk.inverse(" ERROR ")} ${message}`));
}
