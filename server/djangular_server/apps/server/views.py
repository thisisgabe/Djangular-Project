from django.shortcuts import HttpResponse
from django.core import serializers
from django.forms.models import model_to_dict
from .models import *
import json

# Create your views here.
def create(req):
    post_data = json.loads(req.body.decode())
    errors = User.objects.validate(post_data)
    if errors:
        return HttpResponse(json.dumps(errors), status=400, content_type='application/json')
    
    # create a user, return user info as json
    entire_user = User.objects.easy_create(post_data)
    user = {
        'first_name': entire_user.first_name,
        'id': entire_user.id,
    }
    json_user = json.dumps(user)
    return HttpResponse(json_user, status=200, content_type="application/json")

def login(req):
    post_data = json.loads(req.body.decode())
    valid, result = User.objects.login(post_data)
    if not valid:
        json_errors = json.dumps(result)
        return HttpResponse(json_errors, status=400, content_type="application/json")
    user = {
        'first_name': result.first_name,
        'id': result.id,
    }
    json_user = json.dumps(user)
    return HttpResponse(json_user, status=200, content_type='application/json')

def create_song(req):
    post_data = json.loads(req.body.decode())
    errors = Song.objects.validate(post_data)

    if errors:
        return HttpResponse(json.dumps(errors), status=400, content_type='application/json')
    
    # create a user, return user info as json
    entire_song = Song.objects.easy_create(post_data)
    song = {
        'id': entire_song.id,
        'artist': entire_song.artist,
        'title': entire_song.title,
    }
    json_song = json.dumps(song)
    return HttpResponse(json_song, status=200, content_type="application/json")

def get_songs(req):
    all_songs = Song.objects.get_all_songs()
    data = json.dumps(all_songs)
    return HttpResponse(data, status=200, content_type='application/json')

def user_add_song(req):
    post_data = json.loads(req.body.decode())
    playlist = Playlist.objects.easy_create(post_data)
    data = model_to_dict(playlist)
    data = json.dumps(data)
    return HttpResponse(data, status=200, content_type='application/json')

def get_song_users(req):
    post_data = json.loads(req.body.decode())
    data = Playlist.objects.get_song_details(post_data)
    print(data)
    data = json.dumps(data)
    print(data)
    return HttpResponse(data, status=200, content_type='application/json')

def get_user_songs(req):
    post_data = json.loads(req.body.decode())
    data = User.objects.get_user_playlist(post_data)
    print(data)
    data = json.dumps(data)
    print(data)
    return HttpResponse(data, status=200, content_type='application/json')