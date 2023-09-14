// npm packages
const request = require("supertest");

// app imports
const app = require("../app");
const db = require("../db");

let testCat;

beforeEach(async function () {
  await db.query("DELETE FROM cats");
  let result = await db.query(`
    INSERT INTO cats (name)
    VALUES ('TestCat')
    RETURNING id, name`);
  testCat = result.rows[0];
});


/** GET /cats - returns `{cats: [cat, ...]}` */

describe("GET /cats", function () {
  test("Gets list", async function () {
    const resp = await request(app).get(`/cats`);
    expect(resp.body).toEqual({
      cats: [testCat],
    });
  });
});
// end


/** GET /cats/[id] - return data about one cat: `{cat: cat}` */

describe("GET /cats/:id", function () {
  test("Gets single cat", async function () {
    const resp = await request(app).get(`/cats/${testCat.id}`);
    expect(resp.body).toEqual({ cat: testCat });
  });

  test("404 if not found", async function () {
    const resp = await request(app).get(`/cats/0`);
    expect(resp.statusCode).toEqual(404);
  });
});
// end


/** POST /cats - create cat from data; return `{cat: cat}` */

describe("POST /cats", function () {
  test("Create new cat", async function () {
    const resp = await request(app)
        .post(`/cats`)
        .send({ name: "Ezra" });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      cat: { id: expect.any(Number), name: "Ezra" },
    });
  });

  test("400 if empty request body", async function () {
    const resp = await request(app)
        .post(`/cats`)
        .send();
    expect(resp.statusCode).toEqual(400);
  });
});
// end


/** PATCH /cats/[id] - update cat; return `{cat: cat}` */

describe("PATCH /cats/:id", function () {
  test("Update single cat", async function () {
    const resp = await request(app)
        .patch(`/cats/${testCat.id}`)
        .send({ name: "Troll" });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      cat: { id: testCat.id, name: "Troll" },
    });
  });

  test("404 if not found", async function () {
    const resp = await request(app)
      .patch(`/cats/0`)
      .send({name: "Troll"});
    expect(resp.statusCode).toEqual(404);
  });

  test("400 if empty request body", async function () {
    const resp = await request(app)
      .patch(`/cats/${testCat.id}`)
      .send();
    expect(resp.statusCode).toEqual(400);
  });
});
// end


/** DELETE /cats/[id] - delete cat,
 *  return `{message: "Cat deleted"}` */

describe("DELETE /cats/:id", function () {
  test("Delete single cat", async function () {
    const resp = await request(app)
        .delete(`/cats/${testCat.id}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ message: "Cat deleted" });
  });
});
// end


afterAll(async function () {
  // close db connection --- if you forget this, Jest will hang
  await db.end();
});
