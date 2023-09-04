## JSON API Test:

```python
def test_all_desserts(self):
    with app.test_client() as client:
        resp = client.get("/desserts")
        self.assertEqual(resp.status_code, 200)

        self.assertEqual(
            resp.json,
            {'desserts': [{
                'id': self.dessert_id,
                'name': 'TestCake',
                'calories': 10
            }]})
```

## JSON API Test ID Unknown:

```python
def test_create_dessert(self):
    with app.test_client() as client:
        resp = client.post(
            "/desserts", json={
                "name": "TestCake2",
                "calories": 20,
            })

        self.assertEqual(resp.status_code, 201)
        self.assertIsInstance(resp.json['dessert']['id'], int)

        # don't know what ID it will be, so pull out of resp and use in test
        id = resp.json['dessert']['id']
        self.assertEqual(
            resp.json,
            {"dessert": {'id': id, 'name': 'TestCake2', 'calories': 20}})

        self.assertEqual(Dessert.query.count(), 2) # 2 desserts in database
```
