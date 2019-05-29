from django.shortcuts import HttpResponse
from django.core import serializers
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
        'gold': entire_user.gold
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
        'gold': result.gold
    }
    json_user = json.dumps(user)
    return HttpResponse(json_user, status=200, content_type='application/json')