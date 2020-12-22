# Ember Flat to Nested

Transforms a **flat colocated** component structure to a **nested colocated** component structure.

## 👨‍💻 Usage

```shell
npx github:bertdeblock/ember-flat-to-nested
```

Works inside projects and addons.

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
