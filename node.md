## Start a Project with NPM

- `npm init` - creates package.json with metadata and dependencies
- `npm init --yes` or `npm init -y` for defaults
- store package.json in Git

Example package.json:

```JavaScript
{
  "name": "node-files",
  "version": "1.0.0",
  "description": "Exercise to create file listing functions.",
  "main": "",
  "scripts": {
    "start": "node index.js"
  },
  "author": "Whiskey the Dog",
  "license": "GPL-v3",
  "dependencies": {
    "lodash": "0.x"
  }
}
```

### Installing Packages

- `npm install <package_name>` - dependencies added to package.json, then installs in
  nodes_modules folder
- .gitignore node_modules
- `npm install` will read from package.json for dependencies
