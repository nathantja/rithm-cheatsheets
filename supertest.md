## Quickstart

- `npm i --save-dev supertest`
- need jest installed
- async function and await
- `node --inspect-brk $(which jest) --runInBand NAME_OF_FILE` - debugger for jest

- cats-routes.test.js:

```JavaScript
const request = require("supertest");
const app = require("../app");
```

Runs all jest syntax:

- beforeEach()
- afterEach()
- expect
- toEqual

- await request

## READ

```JavaScript
/** GET /cats - returns `{cats: [cat, ...]}` */

describe("GET /cats", function() {
  it("Gets a list of cats", async function() {
    const resp = await request(app).get(`/cats`);

    expect(resp.body).toEqual({ cats: [pickles] });
  });
});
```

## CREATE

```JavaScript
/** POST /cats - create cat from data; return `{cat: cat}` */

describe("POST /cats", function() {
  it("Creates a new cat", async function() {
    const resp = await request(app)
      .post(`/cats`)
      .send({
        name: "Ezra"
      });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      cat: { name: "Ezra" }
    });
  });
});
```

## UPDATE

```JavaScript
/** PATCH /cats/[name] - update cat; return `{cat: cat}` */

describe("PATCH /cats/:name", function() {
  it("Updates a single cat", async function() {
    const resp = await request(app)
      .patch(`/cats/${pickles.name}`)
      .send({
        name: "Troll"
      });
    expect(resp.body).toEqual({
      cat: { name: "Troll" }
    });
  });

  it("Responds with 404 if name invalid", async function() {
    const resp = await request(app).patch(`/cats/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});
```

## DELETE

```JavaScript
/** DELETE /cats/[name] - delete cat,
 *  return `{message: "Cat deleted"}` */

describe("DELETE /cats/:name", function() {
  it("Deletes a single a cat", async function() {
    const resp = await request(app)
      .delete(`/cats/${pickles.name}`);
    expect(resp.body).toEqual({ message: "Deleted" });
    expect(db.Cat.all().length).toEqual(0);
  });
});
```