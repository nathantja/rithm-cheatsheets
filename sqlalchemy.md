## Housekeeping:

- (venv) $ `pip3 install psycopg2-binary`
- (venv) $ `pip3 install flask-sqlalchemy`

iPython:

- `%run app.py`
- `db.drop_all()`
- `db.create_all()`

## models.py Boilerplate:

```python
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    """Connect to database."""

    app.app_context().push()
    db.app = app
    db.init_app(app)
```

## app.py Boilerplate:

- Uncommented is relevant to sqlalchemy

```python
import os

# from flask import Flask, redirect, render_template, flash
# from flask_debugtoolbar import DebugToolbarExtension

from models import db, connect_db, Playlist, Song, PlaylistSong
# from forms import NewSongForPlaylistForm, SongForm, PlaylistForm

#app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", 'postgresql:///playlist_app')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

#app.config['SECRET_KEY'] = "I'LL NEVER TELL!!"
#app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
#debug = DebugToolbarExtension(app)
```

- SQLALCHEMY_DATABASE_URI: Where is your database?
- SQLALCHEMY_TRACK_MODIFICATIONS; Always set to False
- SQLALCHEMY_ECHO: Print SQL to terminal (helpful for debugging)

## Database Models:

```python
class Pet(db.Model):
    """Pet."""

    __tablename__ = "pets"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True)

    name = db.Column(
        db.String(50),
        nullable=False,
        unique=True)

    species = db.Column(
        db.String(30),
        nullable=True)

    hunger = db.Column(
        db.Integer,
        nullable=False,
        default=20)

```

## Using Models:

```python
fluffy = Pet(name='Fluffy', species="cat", hunger=30)
fluffy.hunger #30

db.session.add(fluffy) #only need to add it once, future edits can just commit
db.session.commit()
```

## Methods:

Instance Methods:

```python
# class Pet(db.Model):
#     """Pet."""

#     __tablename__ = "pets"

#     id = ...
#     name = ...
#     species = ...
#     hunger = ...

    def greet(self):
        """Greet using name."""

        name = self.name
        species = self.species or "thing"
        return f"I'm {name} the {species}"

    def feed(self, units=10):
        """Nom nom nom."""

        self.hunger -= units
        self.hunger = max(self.hunger, 0)

```

Class Methods:

```python
# class Pet(db.Model):
#     """Pet."""

#     __tablename__ = "pets"

#     id = ...
#     name = ...
#     species = ...
#     hunger = ...

#     def greet(self): ...
#     def feed(self, units=10): ...

    @classmethod
    def get_by_species(cls, species):
        """Get all pets by species."""

        return Pet.query.filter_by(
            species=species).all()
```

## Relationships:

Foreign Key ('tablename.column'):

```python
class Employee(db.Model):   # ...
    dept_code = db.Column(
        db.Text,
        db.ForeignKey('departments.dept_code'))
```

1:M 'Model' is first argument, whereas backref is 'tablename':

```python
class Employee(db.Model):   # ...
    dept_code = db.Column(
        db.Text,
        db.ForeignKey('departments.dept_code'))

    dept = db.relationship( 'Department', backref='employees')
```

## Querying:

```python
Employee.query.filter_by(name='Liz')
#
Employee.query.filter(Employee.name == 'Liz')
Employee.query.filter(Employee.id > 1)
#
Department.query.get_or_404('fin')
```
