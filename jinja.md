## Extends:

```html
{% extends 'base.html' %}
```

## Flashed Messages:

```html
{% for msg in get_flashed_messages() %}
<div class="alert alert-info">{{ msg }}</div>
{% endfor %}
```

## Blocks:

```html
{% block title %}{% endblock %}
```

```html
{% block content %}{% endblock %}
```

## Flask-WTF:

```html
<form action="/playlists/add" method="POST">
  {{ form.hidden_tag() }} {% for field in form if field.widget.input_type !=
  'hidden' %}

  <div>{{ field.label }}</div>
  <div>{{ field }}</div>

  {% for error in field.errors %}
  <div class="text-danger">{{ error }}</div>
  {% endfor %}
  <br />

  {% endfor %}

  <button class="btn btn-primary" type="submit">Submit</button>
</form>
```

## if / for:

```html
{% if song.playlists %}
<p><b>Part of these playlists:</b></p>
<ul>
  {% for playlist in song.playlists %}
  <li>
    <a href="/playlists/{{ playlist.id }}">{{ playlist.name }}</a>
  </li>
  {% endfor %}
</ul>
{% endif %}
```
