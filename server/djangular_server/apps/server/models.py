from django.db import models
import re
import bcrypt

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

# Create your models here.
class UserManager(models.Manager):
    def validate(self, form):
        errors = []
        if len(form['first_name']) < 2:
            errors.append("First name must be at least 2 characters long")
        if len(form['last_name']) < 2:
            errors.append("Last name must be at least 2 characters long")

        if User.objects.filter(email=form['email']):
            errors.append('Email must be unique')
        if not EMAIL_REGEX.match(form['email']):
            errors.append("Email must be valid")
        if form['password'] != form['passwordRepeat']:
            errors.append("Password's must match")
        if len(form['password']) < 8:
            errors.append("Password must be at least 8 characters long")
        return errors

    def easy_create(self, form):
        pw_hash = bcrypt.hashpw(form['password'].encode(), bcrypt.gensalt())
        return User.objects.create(
            first_name=form['first_name'],
            last_name=form['last_name'],
            email=form['email'],
            pw_hash=pw_hash.decode('utf-8'),
        )

    def login(self, form):
        matching_users = User.objects.filter(email=form['email'])
        if matching_users:
            user = matching_users[0]
            print(user)
            if bcrypt.checkpw(form['password'].encode('utf-8'), user.pw_hash.encode('utf-8')):
                return (True, user)
        return (False, "Email or password invalid")

class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    pw_hash = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = UserManager()

class SongManager(models.Manager):
    def validate(self, form):
        errors = []
        if len(form['title']) < 2:
            errors.append('Song title cannot be less than 2 characters!')
        if len(form['title']) > 255:
            errors.append('Song title cannot exceed 255 characters!')
        if len(form['artist']) < 2:
            errors.append('Artist name cannot be less than 2 characters!')
        if len(form['artist']) > 255:
            errors.append('Artist name cannot exceed 255 characters!')
        return errors
    
    def easy_create(self, form):
        return User.objects.create(
            title=form['title'],
            artist=form['artist'],
        )

class Song(models.Model):
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    users_added = models.ManyToManyField(User, related_name='songs_added')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = SongManager()