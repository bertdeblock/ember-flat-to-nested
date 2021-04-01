'use strict';

const fsExtra = require('fs-extra');
const path = require('path');
const recursiveCopy = require('recursive-copy');

async function copyBlueprint(blueprintName) {
  const blueprintSourcePath = testPath('blueprints', blueprintName);
  const blueprintTargetPath = testPath('output', blueprintName);

  await fsExtra.remove(blueprintTargetPath);

  return recursiveCopy(blueprintSourcePath, blueprintTargetPath);
}

function testFileExists(filePath) {
  return fsExtra.pathExists(testPath('output', filePath));
}

function testPath() {
  return path.join(__dirname, ...arguments);
}

module.exports = {
  copyBlueprint,
  testFileExists,
  testPath,
};
