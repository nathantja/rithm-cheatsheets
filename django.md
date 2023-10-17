[Django Tutorial](https://docs.djangoproject.com/en/4.2/intro/tutorial01/)

**Common Commands**

  python -m django --version     _version checking_

  python -m pip install Django       _installation_

  django-admin startproject mysite     _outputs below structure_



  mysite/
    manage.py
    mysite/
        __init__.py
        settings.py
        urls.py
        asgi.py
        wsgi.py


  python manage.py runserver -optional port-   _from outer mysite directory_

  python manage.py startapp -app name-  _same directory as manage.py_

  python manage.py shell     _interactive shell_

  python manage.py createsuperuser     _create admin_

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    **3 STEPS To implement changes to your models**

    1. _Change your models_ (in models.py)
    2. python manage.py makemigrations
    3. python manage.py migrate

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


```python

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("polls/", include("polls.urls")),
    path("admin/", admin.site.urls),
]
```
The include() function allows referencing other URLconfs.

The path() function is passed four arguments,
    -two required: route and view
    -two optional: kwargs, and name.


Urls in templates

    ```javascript
    <li><a href="{% url 'detail' question.id %}">{{ question.question_text }}</a></li>
    ```
    **urls** points to path() with name 'detail'...

    ```python
    app_name = "polls"
urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("<int:pk>/", views.DetailView.as_view(), name="detail"),
    path("<int:pk>/results/", views.ResultsView.as_view(), name="results"),
    path("<int:question_id>/vote/", views.vote, name="vote"),
]
    ```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

_ModelName_       for specific object, use keyword args in parenthesis
    .objects.all()
    .filter(id=1)  or (question_text__startswith="What")
    .get(id=2)
    .get_obect_or_404()
    .get_list_or_404()  _same as above but uses filter(), raises Http404 if list empty_

    .save()   _save into dB_
    .create()     e.g. (choice_text="Not much", votes=0)
    .delete()
    .count()


- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Django Admin

admin.site.register(_ModelName_)        _give objects admin interface_


- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
_VIEWS_

```python

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST["choice"])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(
            request,
            "polls/detail.html",
            {
                "question": question,
                "error_message": "You didn't select a choice.",
            },
        )
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse("polls:results", args=(question.id,)))
```


render() takes 3 arguments
    1. request object
    2. template name
    3. dictionary (maps template variable names to objects)


request.POST
    -dictionary-like object that lets you access submitted data by key name
    -values are always strings

reverse() arguments:
    1. name of view to pass control to
    2. variable portion of the URL pattern that points to that view



