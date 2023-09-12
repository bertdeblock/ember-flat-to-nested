import test from "ava";
import { flatToNested } from "../lib/index.js";
import { copyBlueprint, testFileExists, testPath } from "./helpers.js";

test("flat to nested inside an app", async function (t) {
  await copyBlueprint("app-flat");
  await flatToNested(testPath("output/app-flat"));

  t.false(await testFileExists("app-flat/app/components/foo.css"));
  t.false(await testFileExists("app-flat/app/components/foo.hbs"));
  t.false(await testFileExists("app-flat/app/components/foo.js"));
  t.false(await testFileExists("app-flat/app/components/foo/bar.css"));
  t.false(await testFileExists("app-flat/app/components/foo/bar.hbs"));
  t.false(await testFileExists("app-flat/app/components/foo/bar.js"));

  t.true(await testFileExists("app-flat/app/components/foo/index.css"));
  t.true(await testFileExists("app-flat/app/components/foo/index.hbs"));
  t.true(await testFileExists("app-flat/app/components/foo/index.js"));
  t.true(await testFileExists("app-flat/app/components/foo/bar/index.css"));
  t.true(await testFileExists("app-flat/app/components/foo/bar/index.hbs"));
  t.true(await testFileExists("app-flat/app/components/foo/bar/index.js"));
  t.true(await testFileExists("app-flat/app/components/baz/index.css"));
  t.true(await testFileExists("app-flat/app/components/baz/index.hbs"));
  t.true(await testFileExists("app-flat/app/components/baz/index.js"));
});

test("nested to flat inside an app", async function (t) {
  await copyBlueprint("app-nested");
  await flatToNested(testPath("output/app-nested"), { revert: true });

  t.true(await testFileExists("app-nested/app/components/foo.css"));
  t.true(await testFileExists("app-nested/app/components/foo.hbs"));
  t.true(await testFileExists("app-nested/app/components/foo.js"));
  t.true(await testFileExists("app-nested/app/components/foo/bar.css"));
  t.true(await testFileExists("app-nested/app/components/foo/bar.hbs"));
  t.true(await testFileExists("app-nested/app/components/foo/bar.js"));
  t.true(await testFileExists("app-nested/app/components/baz.css"));
  t.true(await testFileExists("app-nested/app/components/baz.hbs"));
  t.true(await testFileExists("app-nested/app/components/baz.js"));

  t.false(await testFileExists("app-nested/app/components/foo/index.css"));
  t.false(await testFileExists("app-nested/app/components/foo/index.hbs"));
  t.false(await testFileExists("app-nested/app/components/foo/index.js"));
  t.false(await testFileExists("app-nested/app/components/foo/bar/index.css"));
  t.false(await testFileExists("app-nested/app/components/foo/bar/index.hbs"));
  t.false(await testFileExists("app-nested/app/components/foo/bar/index.js"));
});

test("flat to nested inside a v1 addon", async function (t) {
  await copyBlueprint("v1-addon-flat");
  await flatToNested(testPath("output/v1-addon-flat"));

  t.false(await testFileExists("v1-addon-flat/addon/components/foo.css"));
  t.false(await testFileExists("v1-addon-flat/addon/components/foo.hbs"));
  t.false(await testFileExists("v1-addon-flat/addon/components/foo.js"));
  t.false(await testFileExists("v1-addon-flat/addon/components/foo/bar.css"));
  t.false(await testFileExists("v1-addon-flat/addon/components/foo/bar.hbs"));
  t.false(await testFileExists("v1-addon-flat/addon/components/foo/bar.js"));

  t.true(await testFileExists("v1-addon-flat/addon/components/foo/index.css"));
  t.true(await testFileExists("v1-addon-flat/addon/components/foo/index.hbs"));
  t.true(await testFileExists("v1-addon-flat/addon/components/foo/index.js"));
  t.true(
    await testFileExists("v1-addon-flat/addon/components/foo/bar/index.css"),
  );
  t.true(
    await testFileExists("v1-addon-flat/addon/components/foo/bar/index.hbs"),
  );
  t.true(
    await testFileExists("v1-addon-flat/addon/components/foo/bar/index.js"),
  );
  t.true(await testFileExists("v1-addon-flat/addon/components/baz/index.css"));
  t.true(await testFileExists("v1-addon-flat/addon/components/baz/index.hbs"));
  t.true(await testFileExists("v1-addon-flat/addon/components/baz/index.js"));
});

test("nested to flat inside a v1 addon", async function (t) {
  await copyBlueprint("v1-addon-nested");
  await flatToNested(testPath("output/v1-addon-nested"), { revert: true });

  t.true(await testFileExists("v1-addon-nested/addon/components/foo.css"));
  t.true(await testFileExists("v1-addon-nested/addon/components/foo.hbs"));
  t.true(await testFileExists("v1-addon-nested/addon/components/foo.js"));
  t.true(await testFileExists("v1-addon-nested/addon/components/foo/bar.css"));
  t.true(await testFileExists("v1-addon-nested/addon/components/foo/bar.hbs"));
  t.true(await testFileExists("v1-addon-nested/addon/components/foo/bar.js"));
  t.true(await testFileExists("v1-addon-nested/addon/components/baz.css"));
  t.true(await testFileExists("v1-addon-nested/addon/components/baz.hbs"));
  t.true(await testFileExists("v1-addon-nested/addon/components/baz.js"));

  t.false(
    await testFileExists("v1-addon-nested/addon/components/foo/index.css"),
  );
  t.false(
    await testFileExists("v1-addon-nested/addon/components/foo/index.hbs"),
  );
  t.false(
    await testFileExists("v1-addon-nested/addon/components/foo/index.js"),
  );
  t.false(
    await testFileExists("v1-addon-nested/addon/components/foo/bar/index.css"),
  );
  t.false(
    await testFileExists("v1-addon-nested/addon/components/foo/bar/index.hbs"),
  );
  t.false(
    await testFileExists("v1-addon-nested/addon/components/foo/bar/index.js"),
  );
});

test("flat to nested inside a v2 addon", async function (t) {
  await copyBlueprint("v2-addon-flat");
  await flatToNested(testPath("output/v2-addon-flat"));

  t.false(await testFileExists("v2-addon-flat/src/components/foo.css"));
  t.false(await testFileExists("v2-addon-flat/src/components/foo.hbs"));
  t.false(await testFileExists("v2-addon-flat/src/components/foo.js"));
  t.false(await testFileExists("v2-addon-flat/src/components/foo/bar.css"));
  t.false(await testFileExists("v2-addon-flat/src/components/foo/bar.hbs"));
  t.false(await testFileExists("v2-addon-flat/src/components/foo/bar.js"));

  t.true(await testFileExists("v2-addon-flat/src/components/foo/index.css"));
  t.true(await testFileExists("v2-addon-flat/src/components/foo/index.hbs"));
  t.true(await testFileExists("v2-addon-flat/src/components/foo/index.js"));
  t.true(
    await testFileExists("v2-addon-flat/src/components/foo/bar/index.css"),
  );
  t.true(
    await testFileExists("v2-addon-flat/src/components/foo/bar/index.hbs"),
  );
  t.true(await testFileExists("v2-addon-flat/src/components/foo/bar/index.js"));
  t.true(await testFileExists("v2-addon-flat/src/components/baz/index.css"));
  t.true(await testFileExists("v2-addon-flat/src/components/baz/index.hbs"));
  t.true(await testFileExists("v2-addon-flat/src/components/baz/index.js"));
});

test("nested to flat inside a v2 addon", async function (t) {
  await copyBlueprint("v2-addon-nested");
  await flatToNested(testPath("output/v2-addon-nested"), { revert: true });

  t.true(await testFileExists("v2-addon-nested/src/components/foo.css"));
  t.true(await testFileExists("v2-addon-nested/src/components/foo.hbs"));
  t.true(await testFileExists("v2-addon-nested/src/components/foo.js"));
  t.true(await testFileExists("v2-addon-nested/src/components/foo/bar.css"));
  t.true(await testFileExists("v2-addon-nested/src/components/foo/bar.hbs"));
  t.true(await testFileExists("v2-addon-nested/src/components/foo/bar.js"));
  t.true(await testFileExists("v2-addon-nested/src/components/baz.css"));
  t.true(await testFileExists("v2-addon-nested/src/components/baz.hbs"));
  t.true(await testFileExists("v2-addon-nested/src/components/baz.js"));

  t.false(await testFileExists("v2-addon-nested/src/components/foo/index.css"));
  t.false(await testFileExists("v2-addon-nested/src/components/foo/index.hbs"));
  t.false(await testFileExists("v2-addon-nested/src/components/foo/index.js"));
  t.false(
    await testFileExists("v2-addon-nested/src/components/foo/bar/index.css"),
  );
  t.false(
    await testFileExists("v2-addon-nested/src/components/foo/bar/index.hbs"),
  );
  t.false(
    await testFileExists("v2-addon-nested/src/components/foo/bar/index.js"),
  );
});
