### `SELECT` statement order of operations:
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

### `JOIN` statements:
1. `JOIN` - Specify additional table(s) to join
2. `ON` - Query matches this condition

- INNER JOIN
- (LEFT/RIGHT) OUTER JOIN
- FULL JOIN
