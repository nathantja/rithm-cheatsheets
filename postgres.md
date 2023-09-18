## Housekeeping

### Shell Commands:

- `psql -l` - list all databases in shell
- `psql db_name` - connect to database from shell
- `createdb db_name`- create database (not recommended)
- `dropdb db_name` - delete database (not recommended)
- `pg_dump -c db_name > file.sql` - export a database backup to a file
- `psql -f file.sql db_name` - import data from file (database name must exist)
- `psql -f file.sql` - if the file has CREATE DB syntax already
- `pg_restart` - restart psql server

### PSQL Commands:

- `\dt` - describe tables of database
- `\d table_name` - get schema of table
- `\l` - list all databases
- `CREATE DATABASE name` - create database
- `DROP DATABASE name` - delete database

### Transactions:

- `BEGIN;` - start, then perform any operations
- `COMMIT;` - save changes
- `ROLLBACK;` - closes without committing

## Data Manipulation Language DML

### SQL Operators:

- Common ones: `=, <>, IN, NOT IN, BETWEEN, AND, OR, NOT`
- `NULL IS NULL`

### SQL Aggregates:

- Common ones: `COUNT, AVG, SUM, MIN, MAX, ROUND`

### `SELECT` Statements:

Order of Operations

1. `FROM` - Select and join together tables where data is
2. `WHERE` - Decide which rows to use
3. `GROUP BY` - Place rows into groups
4. `HAVING` - Determine which grouped results to keep
5. `SELECT` (required) - Determine values of result
6. `ORDER BY` - Sort output data
7. `LIMIT` - Limit output to n rows
8. `OFFSET` - Skip n rows at start of output, usually to paginate results

```sql
SELECT title, pub_date, num_likes
    FROM posts
    WHERE author = 'Joel';
```

### `JOIN` Statements:

1. `JOIN` - Specify additional table(s) to join
2. `ON` - Query matches this condition

- `INNER JOIN, (LEFT/RIGHT) OUTER JOIN, FULL JOIN`

```sql
SELECT stars.first_name, stars.last_name, SUM(movies.runtime) AS total_runtime
    FROM movies
        JOIN roles
        ON movies.id = roles.movie_id
        JOIN stars
        ON roles.star_id = stars.id
    WHERE movies.runtime >= 100
    GROUP BY stars.id
    HAVING SUM(movies.runtime) >= 500
    ORDER BY SUM(movies.runtime) DESC, stars.first_name ASC, stars.last_name ASC;
```

### `INSERT` Statements:

```sql
INSERT INTO posts (title, author)
VALUES
('Why We Teach Python', 'Matt'),
('Debugging in Chrome', 'Nate');
```

insert combined with select:

```sql
INSERT INTO posts (title, author)
    SELECT title, author
    FROM some_other_table;
```

### `UPDATE` Statements:

```sql
UPDATE posts SET author = 'Matt';
```

```sql
UPDATE posts SET author = 'Matt' WHERE post_id = 2;
```

### `DELETE` Statements:

```sql
DELETE FROM posts WHERE post_id = 3;
```

```sql
DELETE FROM posts WHERE pub_date IS NULL;
```

Delete all records:

```sql
DELETE FROM posts;
```

## Data Definition Language DDL

### Foreign Key Constraints

#### 1:M

Side with 1:

```sql
CREATE TABLE studios (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  founded_in DATE);
```

Side with M:

```sql
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  release_year INT,
  runtime INT,
  rating TEXT,
  studio_code TEXT REFERENCES studios);
```

#### M:M

- M:M is just 1:M:1 using a join table

### Creating Tables:

`CHECK` and `UNIQUE` example:

```sql
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  released DATE,
  runtime INT NOT NULL,
  rating VARCHAR(5) NOT NULL
    CHECK (rating IN
       ('G', 'PG', 'PG-13', 'R', 'NC-17')),
  studio_code VARCHAR(10) NOT NULL REFERENCES studios,
  UNIQUE (title, released));
```

### Column Specifications:

- `text, varchar(n), int, float`
- `numeric` for fixed-precision numbers
- `boolean, date, timestamp, timestamp with time zone`
- `serial` auto-incrementing numbers

### Constraints:

- `PRIMARY KEY` - can have multiple
- `FOREIGN KEY` - references another table
- `NOT NULL` - if must be filled in
- `UNIQUE` - can span multiple columns (first_name, last_name, dob)
- `CHECK` - check a condition

### Comments
- `--` means comment





LIKE
ILIKE