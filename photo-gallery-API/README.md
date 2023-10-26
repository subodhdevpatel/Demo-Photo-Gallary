# Steps to be followed to install project in local machine:

1. Install all the dependencies from pipenv file using command

```sh
pipenv install
```

2. Here we have used default sqlite database and put it into the project directory already so no need to migrate the migration files again.

3. Runserver using command

```sh
python manage.py runserver
```