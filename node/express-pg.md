## Start

- `npm install pg` - install postgres

## db.js

```JavaScript
/** Database setup for users in db.js */
"use strict";

const { Client } = require("pg");

const DB_URI = process.env.NODE_ENV === "test"  // 1
    ? "postgresql:///simple_users_test"
    : "postgresql:///simple_users";

let db = new Client({
  connectionString: DB_URI
});

db.connect();                                   // 2

module.exports = db;                            // 3
```

## REMINDERS

- db.query is async
- Parameterized queries are 1-indexed
- RETURNING, can return for INSERT, UPDATE, DELETE
  INSERT INTO users (name, type) VALUES (...) RETURNING id, name;
- don’t need to explicitly commit (each INSERT/UPDATE/DELETE commits automatically)

## READ

```JavaScript
router.get("/good-search",
async function (req, res, next) {
  const type = req.query.type;

  const results = await db.query(
    `SELECT id, name, type
             FROM users
             WHERE type = $1`, [type]);
  const users = results.rows;
  return res.json({ users });
});
```

## CREATE

```JavaScript
router.post("/", async function (req, res, next) {
  console.log ("*** POST / req.body:", req.body);
  if (!req.body) throw new BadRequestError();

  const { name, type } = req.body;
  const result = await db.query(
    `INSERT INTO users (name, type)
           VALUES ($1, $2)
           RETURNING id, name, type`,
    [name, type],
  );
  const user = result.rows[0];
  return res.status(201).json({ user });
});
```

## UPDATE

```JavaScript
router.put("/:id", async function (req, res, next) {
  if (req.body === undefined) throw new BadRequestError();
  const { name, type } = req.body;

  const result = await db.query(
    `UPDATE users
           SET name=$1,
               type=$2
           WHERE id = $3
           RETURNING id, name, type`,
    [name, type, req.params.id],
  );
  const user = result.rows[0];
  return res.json({ user });
});
```

## DELETE

```JavaScript
router.delete("/:id", async function (req, res, next) {
  await db.query(
    "DELETE FROM users WHERE id = $1",
    [req.params.id],
  );
  return res.json({ message: "Deleted" });
});
```

# TESTING

- don't pollute production
- jest sets .NODE_ENV variable to "test"

## 1:M Relationship

```JavaScript
router.get("/:id",
  async function (req, res, next) {
    const id = req.params.id;
    const uResults = await db.query(`
          SELECT id, name, type
          FROM users
          WHERE id = $1`, [id]);
    const user = uResults.rows[0];

    const mResults = await db.query(`
          SELECT id, msg_content
          FROM messages
          WHERE user_id=$1`, [id]);
    const messages = mResults.rows;

    user.messages = messages;
    return res.json({ user });
  });
```

## M:M Relationship

```JavaScript
router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  const mResults = await db.query(
    `SELECT id, msg_content
           FROM messages
           WHERE id = $1`, [id]);
  const message = mResults.rows[0];

  const tResults = await db.query(
    `SELECT tag_name
           FROM messages_tags AS mt
            JOIN tags AS t ON mt.tag_code = t.code
           WHERE mt.message_id = $1
           ORDER BY tag_name`, [id]);
  message.tags = tResults.rows.map(r => r.tag_name);

  return res.json({ message });
});

```
