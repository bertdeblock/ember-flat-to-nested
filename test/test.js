'use strict';

const test = require('ava');
const fsExtra = require('fs-extra');
const path = require('path');
const recursiveCopy = require('recursive-copy');
const flatToNested = require('../lib');

test.beforeEach(cleanupOutput);

test.serial('flat to nested inside a project', async function (t) {
  await copyBlueprint('project-flat');
  await flatToNested(outputPath());

  t.false(await outputFileExists('app/components/foo.js'));
  t.false(await outputFileExists('app/components/foo.hbs'));
  t.false(await outputFileExists('app/components/foo/bar.js'));
  t.false(await outputFileExists('app/components/foo/bar.hbs'));

  t.true(await outputFileExists('app/components/foo/index.js'));
  t.true(await outputFileExists('app/components/foo/index.hbs'));
  t.true(await outputFileExists('app/components/foo/bar/index.js'));
  t.true(await outputFileExists('app/components/foo/bar/index.hbs'));
  t.true(await outputFileExists('app/components/baz/index.js'));
  t.true(await outputFileExists('app/components/baz/index.hbs'));
});

test.serial('nested to flat inside a project', async function (t) {
  await copyBlueprint('project-nested');
  await flatToNested(outputPath(), { revert: true });

  t.true(await outputFileExists('app/components/foo.js'));
  t.true(await outputFileExists('app/components/foo.hbs'));
  t.true(await outputFileExists('app/components/foo/bar.js'));
  t.true(await outputFileExists('app/components/foo/bar.hbs'));
  t.true(await outputFileExists('app/components/baz.js'));
  t.true(await outputFileExists('app/components/baz.hbs'));

  t.false(await outputFileExists('app/components/foo/index.js'));
  t.false(await outputFileExists('app/components/foo/index.hbs'));
  t.false(await outputFileExists('app/components/foo/bar/index.js'));
  t.false(await outputFileExists('app/components/foo/bar/index.hbs'));
});

test.serial('flat to nested inside an addon', async function (t) {
  await copyBlueprint('addon-flat');
  await flatToNested(outputPath());

  t.false(await outputFileExists('addon/components/foo.js'));
  t.false(await outputFileExists('addon/components/foo.hbs'));
  t.false(await outputFileExists('addon/components/foo/bar.js'));
  t.false(await outputFileExists('addon/components/foo/bar.hbs'));

  t.true(await outputFileExists('addon/components/foo/index.js'));
  t.true(await outputFileExists('addon/components/foo/index.hbs'));
  t.true(await outputFileExists('addon/components/foo/bar/index.js'));
  t.true(await outputFileExists('addon/components/foo/bar/index.hbs'));
  t.true(await outputFileExists('addon/components/baz/index.js'));
  t.true(await outputFileExists('addon/components/baz/index.hbs'));
});

test.serial('nested to flat inside an addon', async function (t) {
  await copyBlueprint('addon-nested');
  await flatToNested(outputPath(), { revert: true });

  t.true(await outputFileExists('addon/components/foo.js'));
  t.true(await outputFileExists('addon/components/foo.hbs'));
  t.true(await outputFileExists('addon/components/foo/bar.js'));
  t.true(await outputFileExists('addon/components/foo/bar.hbs'));
  t.true(await outputFileExists('addon/components/baz.js'));
  t.true(await outputFileExists('addon/components/baz.hbs'));

  t.false(await outputFileExists('addon/components/foo/index.js'));
  t.false(await outputFileExists('addon/components/foo/index.hbs'));
  t.false(await outputFileExists('addon/components/foo/bar/index.js'));
  t.false(await outputFileExists('addon/components/foo/bar/index.hbs'));
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
