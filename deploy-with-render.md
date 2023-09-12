## ElephantSQL

#### Step 1: Getting a database

Create account at ElephantSQL using GitHub
Create a “Tiny Turtle” (free) instance
Select region: US-West-1 (even if others are closer to you).
If you get an error selecting US-West-1, pick US-East-1
Confirm and create
Click on your new instance and copy the URL

#### Step 2: Seeding your new database

`pg_dump -O warbler | psql (url you copied here)`

This dumps your existing warbler database and loads it in your new database.

#### Step 3: Checking your database

`psql (url you copied here)`


## Render

#### Install gunicorn
`pip install gunicorn`

`pip freeze > requirements.txt`

#### Setting up your app
Create an account at Render using GitHub
From dashboard, create a new instance of “Web service”
Connect to your repository
Give it a name (this must be globally unique)
Make sure the start command is gunicorn app:app --threads 4
Choose advanced, and enter environmental variables:
DATABASE_URL: URL from ElephantSQL (change postgres: → postgresql:)
SECRET_KEY: anything you want (to be secure: long and random)
PYTHON_VERSION: 3.11.2
Choose “Create Web Service”