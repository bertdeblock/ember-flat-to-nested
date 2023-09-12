# Ember Flat to Nested

[![CI](https://github.com/bertdeblock/ember-flat-to-nested/workflows/CI/badge.svg)](https://github.com/bertdeblock/ember-flat-to-nested/actions?query=workflow%3ACI)

Transforms a **flat colocated** component structure to a **nested colocated** component structure.

- Works for projects and addons (v1, v2 and in-repo addons)
- Supports reverting to a flat colocated component structure
- Ignores component files that already comply to the desired component structure
- Takes into account CSS module files (in case you are using [ember-css-modules](https://github.com/salsify/ember-css-modules))

> **NOTE:** Use [ember-component-template-colocation-migrator](https://github.com/ember-codemods/ember-component-template-colocation-migrator) if you want to transform a **classic** component structure to a **flat or nested colocated** component structure.

## ✅ Compatibility

- Node.js v18 or above

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
