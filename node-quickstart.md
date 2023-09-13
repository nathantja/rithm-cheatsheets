## REPL - read evaluate print loop

- `node`
- `node <file>.js` - evaluates and exits the file

## Start a Project with NPM - Node Package Manager

- `npm init` - creates package.json with metadata and dependencies
- `npm init --yes` or `npm init -y` for defaults
- store package.json in Git repositories

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

- `npm install <package_name>` - dependencies added to package.json, then
  installs in nodes_modules folder
- `npm i lodash` - i also works
- .gitignore node_modules
- `npm install` will read from package.json for dependencies

- `npm list -g` - list all things globally installed

## Process - is a global object

### env variables

- `export SECRET_CODE="1234"` - in the regular shell
- `process.env.SECRET_CODE` or `process.env`- see specific env variable or all

### .argv

- `process.argv` - array of args given to shell to start this program

- 1st value always the copy of node
- 2nd full path to file
- the rest...

- process.argv[2]
- process.argv.includes() etc.

### exit
- tell code to immediately stop executing
- 0, no error
- 1, script error
- `process.exit(1)`

## Share Code Between Files

### Import using require

#### Library

- `const _ = require("lodash")`;
- package name must match and be in node_modules

#### Custom Files ./ or ../

- `const utils = require("./utils")`; import from this file, conventional to import as
- `utils.sum`
- doesn't need ".js" for file name
- `const {sum} = require("./utils")`; can also destructure right away
- the file must explicitly export the things needed

### Export using modules.export

```JavaScript
const PI = ...
const sum = (a,b) => a + b

modules.exports = {
  PI: PI,
  sum: sum,
  color: "TEAL"
}
```

## fs - file system (promises version)

### Read
- `const fsP = require("fs/promises")` - this is a standard package in node
- `fsP.readFile(path, encoding)`
- relative path to file
- encoding, usually UTF8

```JavaScript
const fsP = require("fs/promises");

async function readMyFile() {
  try {
    let contents = await fsP.readFile("myFile.txt", "utf8");
    console.log("file contents", contents);
  } catch (err) {
    process.exit(1);
  }
}

readMyFile();
```

### Write
- `const fsP = require("fs/promises")` - this is a standard package in node

- `fsP.writeFile(path, data, encoding)`

```JavaScript
const fsP = require("fs/promises");

const content = "THIS WILL GO IN THE FILE!";

async function writeOutput() {
  try {
    await fsP.writeFile("./files/output.txt", content, "utf8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Successfully wrote to file!");
}
```

## Debugging

`node --inspect-brk file.js`

`chrome://inspect` in Google Chrome
OR
use the green button in dev tools