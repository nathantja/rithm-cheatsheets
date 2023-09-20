## Requirements

```JavaScript

const nunjucks = require("nunjucks");

nunjucks.configure("templates", {
  autoescape: true,
  express: app,
});

```