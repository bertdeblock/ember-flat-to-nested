# Ember Flat to Nested

[![CI](https://github.com/bertdeblock/ember-flat-to-nested/workflows/CI/badge.svg)](https://github.com/bertdeblock/ember-flat-to-nested/actions?query=workflow%3ACI)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Transforms a **flat colocated** component structure to a **nested colocated** component structure.

- Works for projects and addons (including in-repo addons)
- Supports reverting to a flat colocated component structure
- Ignores component files that already comply to the desired component structure
- Takes into account CSS module files (in case you are using [ember-css-modules](https://github.com/salsify/ember-css-modules))

> **NOTE:** Use [ember-component-template-colocation-migrator](https://github.com/ember-codemods/ember-component-template-colocation-migrator) if you want to transform a **classic** component structure to a **flat or nested colocated** component structure.

## 👨‍💻 Usage

### Flat to Nested

```shell
cd your/project-or-addon/path
npx github:bertdeblock/ember-flat-to-nested
```

#### Before

```
your-project-name
├── app
│   └── components
│       ├── foo
│       │   ├── bar.hbs
│       │   └── bar.js
│       ├── foo.hbs
│       └── foo.js
│   ...
```

#### After

```
your-project-name
├── app
│   └── components
│       └── foo
│           ├── bar
│           │   ├── index.hbs
│           │   └── index.js
│           ├── index.hbs
│           └── index.js
│   ...
```

### Nested to Flat

```shell
cd your/project-or-addon/path
npx github:bertdeblock/ember-flat-to-nested --revert
```

#### Before

```
your-project-name
├── app
│   └── components
│       └── foo
│           ├── bar
│           │   ├── index.hbs
│           │   └── index.js
│           ├── index.hbs
│           └── index.js
│   ...
```

#### After

```
your-project-name
├── app
│   └── components
│       ├── foo
│       │   ├── bar.hbs
│       │   └── bar.js
│       ├── foo.hbs
│       └── foo.js
│   ...
```
