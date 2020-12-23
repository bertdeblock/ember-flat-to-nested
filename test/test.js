const fileExists = require('@kwsites/file-exists');
const test = require('ava');
const fs = require('fs');
const path = require('path');
const recursiveCopy = require('recursive-copy');
const flatToNested = require('../lib');

test.beforeEach(cleanupOutput);

test.serial('it runs inside a project', async function (t) {
  await copyBlueprint('project');
  await flatToNested(outputPath());

  t.false(outputFileExists('app/components/foo.js'));
  t.false(outputFileExists('app/components/foo.hbs'));
  t.false(outputFileExists('app/components/foo/bar.js'));
  t.false(outputFileExists('app/components/foo/bar.hbs'));

  t.true(outputFileExists('app/components/foo/index.js'));
  t.true(outputFileExists('app/components/foo/index.hbs'));
  t.true(outputFileExists('app/components/foo/bar/index.js'));
  t.true(outputFileExists('app/components/foo/bar/index.hbs'));
});

test.serial('it runs inside an addon', async function (t) {
  await copyBlueprint('addon');
  await flatToNested(outputPath());

  t.false(outputFileExists('addon/components/foo.js'));
  t.false(outputFileExists('addon/components/foo.hbs'));
  t.false(outputFileExists('addon/components/foo/bar.js'));
  t.false(outputFileExists('addon/components/foo/bar.hbs'));

  t.true(outputFileExists('addon/components/foo/index.js'));
  t.true(outputFileExists('addon/components/foo/index.hbs'));
  t.true(outputFileExists('addon/components/foo/bar/index.js'));
  t.true(outputFileExists('addon/components/foo/bar/index.hbs'));
});

function copyBlueprint(blueprintName) {
  return recursiveCopy(blueprintPath(blueprintName), outputPath());
}

function outputFileExists(filePath) {
  return fileExists.exists(outputPath(filePath), fileExists.FILE);
}

function cleanupOutput() {
  fs.rmdirSync(outputPath(), { recursive: true });
}

function blueprintPath(blueprintName) {
  return path.join(__dirname, 'blueprints', blueprintName);
}

function outputPath(subPath = '') {
  return path.join(__dirname, 'output', subPath);
}
