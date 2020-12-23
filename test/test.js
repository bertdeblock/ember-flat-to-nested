'use strict';

const test = require('ava');
const fsExtra = require('fs-extra');
const path = require('path');
const recursiveCopy = require('recursive-copy');
const flatToNested = require('../lib');

test.beforeEach(cleanupOutput);

test.serial('it runs inside a project', async function (t) {
  await copyBlueprint('project');
  await flatToNested(outputPath());

  t.false(await outputFileExists('app/components/foo.js'));
  t.false(await outputFileExists('app/components/foo.hbs'));
  t.false(await outputFileExists('app/components/foo/bar.js'));
  t.false(await outputFileExists('app/components/foo/bar.hbs'));

  t.true(await outputFileExists('app/components/foo/index.js'));
  t.true(await outputFileExists('app/components/foo/index.hbs'));
  t.true(await outputFileExists('app/components/foo/bar/index.js'));
  t.true(await outputFileExists('app/components/foo/bar/index.hbs'));
});

test.serial('it runs inside an addon', async function (t) {
  await copyBlueprint('addon');
  await flatToNested(outputPath());

  t.false(await outputFileExists('addon/components/foo.js'));
  t.false(await outputFileExists('addon/components/foo.hbs'));
  t.false(await outputFileExists('addon/components/foo/bar.js'));
  t.false(await outputFileExists('addon/components/foo/bar.hbs'));

  t.true(await outputFileExists('addon/components/foo/index.js'));
  t.true(await outputFileExists('addon/components/foo/index.hbs'));
  t.true(await outputFileExists('addon/components/foo/bar/index.js'));
  t.true(await outputFileExists('addon/components/foo/bar/index.hbs'));
});

function copyBlueprint(blueprintName) {
  return recursiveCopy(blueprintPath(blueprintName), outputPath());
}

function outputFileExists(filePath) {
  return fsExtra.pathExists(outputPath(filePath));
}

function cleanupOutput() {
  return fsExtra.remove(outputPath());
}

function blueprintPath(blueprintName) {
  return path.join(__dirname, 'blueprints', blueprintName);
}

function outputPath(subPath = '') {
  return path.join(__dirname, 'output', subPath);
}
