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
        return (False, ["Email or password invalid"])
    
    def get_user_playlist(self, form):
        user = User.objects.get(id=form['user_id'])
        data = {
            'user_id': user.id,
            'user_first': user.first_name,
            'user_last': user.last_name,
            'songs': [

            ]
        }
        playlist = Playlist.objects.filter(user=user.id)
        if playlist:
            for entry in playlist:
                song = Song.objects.get(id=entry.song.id)
                song_obj = {
                    'song_artist': song.artist,
                    'song_title': song.title,
                    'count': entry.count
                }
                data['songs'].append(song_obj)
        return data

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
        return Song.objects.create(
            title=form['title'],
            artist=form['artist'],
        )
    
    def get_all_songs(self):
        song_list = Song.objects.all()
        data = {
            'songs': []
        }
        if song_list:
            for song in song_list:
                song_obj = {
                    'id': song.id,
                    'song_artist': song.artist,
                    'song_title': song.title,
                    'count': 0
                }
                playlists = Playlist.objects.filter(song=song.id)
                if playlists:
                    count = 0
                    for entry in playlists:
                        count = count + entry.count
                    song_obj['count'] = count
                data['songs'].append(song_obj)
        return data

class Song(models.Model):
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    users_added = models.ManyToManyField(User, related_name='songs_added')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = SongManager()

class PlaylistManager(models.Manager):
    def easy_create(self, form):
        try:
            playlist = Playlist.objects.get(song=Song.objects.get(id=form['song_id']), user=User.objects.get(id=form['user_id']))
        except Playlist.DoesNotExist:
            playlist = None
        print('testing.................')
        print(playlist)
        if playlist:
            print('found playlist')
            playlist.count = playlist.count + 1
            playlist.save()
            return playlist
        else:
            return Playlist.objects.create(song=Song.objects.get(id=form['song_id']), user=User.objects.get(id=form['user_id']), count=1)

    def get_song_details(self, form):
        song_info = Playlist.objects.filter(song=form['song_id'])
        song = Song.objects.get(id=form['song_id'])
        data = {
            'song_id': song.id,
            'song_title': song.title,
            'song_artist': song.artist,
            'users': []
        }
        if(song_info):
            for entry in song_info:
                user = User.objects.get(id=entry.user_id)
                user_obj = {
                    'id': user.id,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'count': entry.count
                }
                data['users'].append(user_obj)
        return data

class Playlist(models.Model):
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    count = models.IntegerField()
    objects = PlaylistManager()

