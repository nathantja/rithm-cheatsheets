## Housekeeping:

- (venv) $ `pip3 install flask-wtf`

## forms.py Boilerplate:

```python
from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, TextAreaField
from wtforms.validators import InputRequired, Length, Optional
```

## forms.py Example:

```python
class AddPetForm(FlaskForm):
    """Form for adding new pet"""

    name = StringField("Pet Name", validators=[InputRequired(), Length(max=30)])
    species = SelectField("Species",
                          choices=[('cat', 'Cat'), ('dog', 'Dog'),
                                   ('porcupine', 'Porcupine')],
                          validators=[InputRequired(),
                                      AnyOf(['cat', 'dog', 'porcupine'])])
    photo_url = StringField("Photo URL", validators=[Optional(), URL()])
    age = SelectField("Age",
                      choices=[('baby', 'Baby'), ('young', 'Young'),
                               ('adult', 'Adult'), ('senior', 'Senior')],
                      validators=[InputRequired(),
                                  AnyOf(['baby', 'young', 'adult', 'senior'])])
    notes = TextAreaField("Notes", validators=[Optional(), Length(max=500)])
```

## app.py Boilerplate:

```python
from forms import NewSongForPlaylistForm, SongForm, PlaylistForm
```

## app.py Route for New Form:

```python
@app.route("/playlists/add", methods=["GET", "POST"])
def add_playlist():
    """Handle add-playlist form:

    - if form not filled out or invalid: show form
    - if valid: add playlist to SQLA and redirect to list-of-playlists
    """

    form = PlaylistForm()

    if form.validate_on_submit():
        name = form.name.data
        description = form.description.data

        playlist = Playlist(name=name, description=description)

        db.session.add(playlist)
        db.session.commit()

        flash(f"New playlist added.")
        return redirect("/playlists")

    else:
        return render_template("new_playlist.html", form=form)

```

## app.py Route for Edit Form:

```python
@app.route("/<int:id>", methods=["GET", "POST"])
def show_pet_details_and_edit_form(id):
    """Shows details about a pet and a form to edit pet information"""
    pet = Pet.query.get_or_404(id)

    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data

        db.session.commit()

        flash(f"{pet.name} was edited!")
        return redirect(f"/{id}")
    else:
        return render_template("pet_details_edit_form.html", form=form, pet=pet)
```

## Field Types

- BooleanField
- DateField / DateTimeField
- IntegerField / FloatField
- StringField / TextAreaField
- RadioField
- SelectField
- SelectMultipleField

## Validators

- InputRequired, Length, Optional

https://wtforms.readthedocs.io/en/2.3.x/validators/#built-in-validators
