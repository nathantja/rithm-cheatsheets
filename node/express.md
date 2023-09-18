## Quickstart

- `npm install express@next` - latest version
- `node app.js` - run JS files with node
- `Control-C` - to stop server

- vanilla node has to be restarted for every change
- `nodemon app.js` will watch for changes
- `nodemon -e js,html,css`

- console.log() in node does not show up in browser dev tools

```JavaScript
const express = require("express");

const app = express();

app.listen(3000, function () {
  console.log("App started at http://localhost:3000/");
});

app.get("/dogs", function (req, res) {
  return res.send("Dogs go brk brk");
});
```

## Two Files

- best practice for testing

- server.js

```JavaScript
const app = require("./app");

app.listen(3000, function () {
  console.log(
      "Started http://localhost:3000/");
});
```

- app.js

```JavaScript
const express = require("express");
const app = express();

module.exports = app;
```

## Route Handler Callbacks

- req - incoming request object (query string, url params, form data)
- res - outgoing response object (methods for returning html, text, json)
- req/res is built on every request
- if conflicting route, 1st one will be registered and matched

`res.status()` - change status code
`res.json` - `return res.json({ fname: req.params.fname });`
`res.send` -

## Route Methods

- app.get(path, callback)
- app.post(path, callback)
- app.put(path, callback)
- app.patch(path, callback)
- app.delete(path, callback)
- app.all(path, callback) (all methods)

## URL Parameters

- path parameters/URL parameter are passed into req.params

- `app.get("/staff/:fname)...` - fname variable
- `req.params.here` - ${req.params.fname}

## Query String

- Query string (GET requests): `request.query`

- `/search?color=red`
- `request.query.color`

## HTTP Headers

- HTTP headers: `request.headers`
- Content Type
- accepts
- oauth tokens

## Parsing the Body

- which requests have body? POST, PATCH, PUT, DELETE

- form data, JSON, etc.
- Tell express to parse body

Step 1:

```JavaScript
// at the top of app.js

// process JSON body => req.body
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded());
```

Step 2:

- `req.body` - will be json OR form data

body will be undefined without parsing data:

- `fname = req.body?.fname`
- `if (req.body === undefined) throw new BadRequestError();`

## Status Codes

- the code must go before the data is sent

```JavaScript
/** Sample of returning status code */

app.get("/whoops", function (req, res) {
  return res
    .status(404)
    .json({ oops: "Nothing here!" });
});
```

## Error Handling

- Boilerplate expressError.js given to us
- import errors on the app.js
- `throw new NotFoundError("No such user")`

- Respond with JSON based on error message

```JavaScript
/** Error handler: logs stacktrace and returns JSON error message. */

app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});
```

```JavaScript
/** 404 handler: matches unmatched routes. */
app.use(function (req, res) {
  throw new NotFoundError();
});
```

## Boilerplate

```JavaScript
const express = require("express");
const app = express();

const { NotFoundError } = require("./expressError");

app.use(express.json());                           // process JSON data
app.use(express.urlencoded());                     // process trad form data

// ... your routes go here ...

app.use(function (req, res) {                      // handle site-wide 404s
  throw new NotFoundError();
});

app.use(function (err, req, res, next) {           // global err handler
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;                              // don't forget this!
```

## Middleware

- next() used to go to the next thing
- needs (req, res, next)

```JavaScript
/** Logger: prints log message and goes to next. */

function logger(req, res, next) {
  console.log(`Sending ${req.method} request to ${req.path}.`);
  return next();
}
```

- Can be above routes:
- `app.use(logger);`

- Can be for specific routes:
- `app.get(path, fn-1, fn-2, ...)`
  fn-1, fn-2, any number of middlewares

Example of downloadable middleware:

```JavaScript
// morgan - logging with colors
npm install morgan

const morgan = require("morgan")
app.use(morgan('dev'));
```

## Routers
- can split the routes into multiple files

- app.js

```JavaScript
const userRoutes = require("./userRoutes");

app.use("/users", userRoutes);
```

- userRoutes.js

```JavaScript
const express = require("express");
const router = new express.Router();

router.get("/", function (req, res) {
    // code here...

})

module.exports = router;
```
