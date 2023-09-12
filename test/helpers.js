import fsExtra from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";
import recursiveCopy from "recursive-copy";

export async function copyBlueprint(blueprintName) {
  const blueprintSourcePath = testPath("blueprints", blueprintName);
  const blueprintTargetPath = testPath("output", blueprintName);

  await fsExtra.remove(blueprintTargetPath);

  return recursiveCopy(blueprintSourcePath, blueprintTargetPath);
}

export function testFileExists(filePath) {
  return fsExtra.pathExistsSync(testPath("output", filePath));
}

export function testPath() {
  return path.join(path.dirname(fileURLToPath(import.meta.url)), ...arguments);
}
