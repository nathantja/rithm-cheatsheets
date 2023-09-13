## In Python / Flask

## CRUD

1. POST
2. GET
3. PUT/PATCH
4. DELETE

## Serialization models.py Example:

```python
class Dessert(db.Model): ...
    def serialize(self):
        """Serialize to dictionary."""

        return {
            "id": self.id,
            "name": self.name,
            "calories": self.calories,
        }
```

## Serialization app.py Example Singular:

```python
@app.get("/desserts")
def list_all_desserts():
    """Return JSON {'desserts': [{id, name, calories}, ...]}"""

    desserts = Dessert.query.all()
    serialized = [d.serialize() for d in desserts]

    return jsonify(desserts=serialized)
```

## Serialization app.py Example Plural:

```python
@app.get("/desserts/<dessert_id>")
def list_single_dessert(dessert_id):
    """Return JSON {'dessert': {id, name, calories}}"""

    dessert = Dessert.query.get_or_404(dessert_id)
    serialized = dessert.serialize()

    return jsonify(dessert=serialized)
```

## POST (create) app.py Example:

```python
@app.post("/desserts")
def create_dessert():
    """Create dessert from posted JSON data & return it.

    Returns JSON {'dessert': {id, name, calories}}
    """

    name = request.json["name"]
    calories = request.json["calories"]

    new_dessert = Dessert(name=name, calories=calories)

    db.session.add(new_dessert)
    db.session.commit()

    serialized = new_dessert.serialize()

    # Return w/status code 201 --- return tuple (json, status)
    return (jsonify(dessert=serialized), 201)
```
