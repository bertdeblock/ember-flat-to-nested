'use strict';

const test = require('ava');
const flatToNested = require('../lib');
const { copyBlueprint, testFileExists, testPath } = require('./helpers');

test('flat to nested inside a project', async function (t) {
  await copyBlueprint('project-flat');
  await flatToNested(testPath('output/project-flat'));

  t.false(await testFileExists('project-flat/app/components/foo.css'));
  t.false(await testFileExists('project-flat/app/components/foo.hbs'));
  t.false(await testFileExists('project-flat/app/components/foo.js'));
  t.false(await testFileExists('project-flat/app/components/foo/bar.css'));
  t.false(await testFileExists('project-flat/app/components/foo/bar.hbs'));
  t.false(await testFileExists('project-flat/app/components/foo/bar.js'));

  t.true(await testFileExists('project-flat/app/components/foo/index.css'));
  t.true(await testFileExists('project-flat/app/components/foo/index.hbs'));
  t.true(await testFileExists('project-flat/app/components/foo/index.js'));
  t.true(await testFileExists('project-flat/app/components/foo/bar/index.css'));
  t.true(await testFileExists('project-flat/app/components/foo/bar/index.hbs'));
  t.true(await testFileExists('project-flat/app/components/foo/bar/index.js'));
  t.true(await testFileExists('project-flat/app/components/baz/index.css'));
  t.true(await testFileExists('project-flat/app/components/baz/index.hbs'));
  t.true(await testFileExists('project-flat/app/components/baz/index.js'));
});

test('nested to flat inside a project', async function (t) {
  await copyBlueprint('project-nested');
  await flatToNested(testPath('output/project-nested'), { revert: true });

  t.true(await testFileExists('project-nested/app/components/foo.css'));
  t.true(await testFileExists('project-nested/app/components/foo.hbs'));
  t.true(await testFileExists('project-nested/app/components/foo.js'));
  t.true(await testFileExists('project-nested/app/components/foo/bar.css'));
  t.true(await testFileExists('project-nested/app/components/foo/bar.hbs'));
  t.true(await testFileExists('project-nested/app/components/foo/bar.js'));
  t.true(await testFileExists('project-nested/app/components/baz.css'));
  t.true(await testFileExists('project-nested/app/components/baz.hbs'));
  t.true(await testFileExists('project-nested/app/components/baz.js'));

  t.false(await testFileExists('project-nested/app/components/foo/index.css'));
  t.false(await testFileExists('project-nested/app/components/foo/index.hbs'));
  t.false(await testFileExists('project-nested/app/components/foo/index.js'));
  t.false(await testFileExists('project-nested/app/components/foo/bar/index.css'));
  t.false(await testFileExists('project-nested/app/components/foo/bar/index.hbs'));
  t.false(await testFileExists('project-nested/app/components/foo/bar/index.js'));
});

test('flat to nested inside an addon', async function (t) {
  await copyBlueprint('addon-flat');
  await flatToNested(testPath('output/addon-flat'));

  t.false(await testFileExists('addon-flat/addon/components/foo.css'));
  t.false(await testFileExists('addon-flat/addon/components/foo.hbs'));
  t.false(await testFileExists('addon-flat/addon/components/foo.js'));
  t.false(await testFileExists('addon-flat/addon/components/foo/bar.css'));
  t.false(await testFileExists('addon-flat/addon/components/foo/bar.hbs'));
  t.false(await testFileExists('addon-flat/addon/components/foo/bar.js'));

  t.true(await testFileExists('addon-flat/addon/components/foo/index.css'));
  t.true(await testFileExists('addon-flat/addon/components/foo/index.hbs'));
  t.true(await testFileExists('addon-flat/addon/components/foo/index.js'));
  t.true(await testFileExists('addon-flat/addon/components/foo/bar/index.css'));
  t.true(await testFileExists('addon-flat/addon/components/foo/bar/index.hbs'));
  t.true(await testFileExists('addon-flat/addon/components/foo/bar/index.js'));
  t.true(await testFileExists('addon-flat/addon/components/baz/index.css'));
  t.true(await testFileExists('addon-flat/addon/components/baz/index.hbs'));
  t.true(await testFileExists('addon-flat/addon/components/baz/index.js'));
});

test('nested to flat inside an addon', async function (t) {
  await copyBlueprint('addon-nested');
  await flatToNested(testPath('output/addon-nested'), { revert: true });

  t.true(await testFileExists('addon-nested/addon/components/foo.css'));
  t.true(await testFileExists('addon-nested/addon/components/foo.hbs'));
  t.true(await testFileExists('addon-nested/addon/components/foo.js'));
  t.true(await testFileExists('addon-nested/addon/components/foo/bar.css'));
  t.true(await testFileExists('addon-nested/addon/components/foo/bar.hbs'));
  t.true(await testFileExists('addon-nested/addon/components/foo/bar.js'));
  t.true(await testFileExists('addon-nested/addon/components/baz.css'));
  t.true(await testFileExists('addon-nested/addon/components/baz.hbs'));
  t.true(await testFileExists('addon-nested/addon/components/baz.js'));

  t.false(await testFileExists('addon-nested/addon/components/foo/index.css'));
  t.false(await testFileExists('addon-nested/addon/components/foo/index.hbs'));
  t.false(await testFileExists('addon-nested/addon/components/foo/index.js'));
  t.false(await testFileExists('addon-nested/addon/components/foo/bar/index.css'));
  t.false(await testFileExists('addon-nested/addon/components/foo/bar/index.hbs'));
  t.false(await testFileExists('addon-nested/addon/components/foo/bar/index.js'));
});
