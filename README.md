# Ember Flat to Nested

Transforms a **flat colocated** component structure to a **nested colocated** component structure.

## Usage

```shell
npx github:Bagaar/ember-flat-to-nested --dir app/components
npx github:Bagaar/ember-flat-to-nested --dir addon/components
```

### Before

```
your-project-name
├── app
│   └── components
│       ├── foo-bar
│       │   ├── baz.hbs
│       │   └── baz.js
│       ├── foo-bar.hbs
│       └── foo-bar.js
│   ...
```

### After

```
your-project-name
├── app
│   └── components
│       └── foo-bar
│           ├── baz
│           │   ├── index.hbs
│           │   └── index.js
│           ├── index.hbs
│           └── index.js
│   ...
```