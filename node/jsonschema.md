## Overview

- npm install jsonschema
- save demoSchema.json

```js
const jsonschema = require("jsonschema");
const demoSchema = require("./demoSchema.json"); // include the .json extension
```

## Validate

```js
.validate(userInput, mySchema, {required: true})



router.post("/with-validation", function (req, res, next) {
    const result = jsonschema.validate(
        // validate on the ORDER object itself
      req.body?.order, orderSchema, {required: true});
  if (!result.valid) {
    // pass validation errors to error handler
    //  (the "stack" key is generally the most useful)
    const errs = result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }

  // insert into db ...
  return res.json({ordered: true});
});
```

- after validate, result will have .valid key that is true or false

## Schema

```js
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://our.company.com/order.schema.json",
  "title": "Order",
  "description": "Order for an ice cream.",
  "type": "object",
  "properties": {
    "flavor": {"type": "string"},
    "numScoops": {
      "type": "integer",
      "minimum": 1,
      "maximum": 3
    },
    "cone": {"type": "boolean"},
    "cost": {"type": "number"}
  },
  "additionalProperties": false,
  "required": [
    "flavor",
    "numScoops",
    "cone",
    "cost"
  ]
}
```

- schema is boilerplate
- id, title, description, are decorative

- properties key for all
- value is another object

- additional properties will fail

- required, array of keys; anything optional take out of here
