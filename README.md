# Ember Flat to Nested

Transforms a **flat colocated** component structure to a **nested colocated** component structure.

> **NOTE:** Use [ember-component-template-colocation-migrator](https://github.com/ember-codemods/ember-component-template-colocation-migrator) if you want to transform a **classic** component structure to a **flat or nested colocated** component structure.

## 👨‍💻 Usage

```shell
cd your/project-or-addon/path
npx github:bertdeblock/ember-flat-to-nested
```

### Before

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

### After

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
