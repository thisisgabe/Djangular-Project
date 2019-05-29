from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'^users/create/$', views.create),
    url(r'^users/login/$', views.login),
    # url(r'^$', views.index),
    # url(r'^shows/$', views.shows),
    # url(r'^shows/new/$', views.add_show),
    # url(r'^shows/create/$', views.create),
    # url(r'^shows/(?P<id>\d+)/$', views.show),
    # url(r'^shows/(?P<id>\d+)/edit/$', views.edit_show),
    # url(r'^shows/(?P<id>\d+)/update/$', views.update),
    # url(r'^shows/(?P<id>\d+)/destroy/$', views.destroy),
    # url(r'^(?P<number>\d+)$', views.show),
    # url(r'^(?P<number>\d+)/edit$', views.edit),
    # url(r'^(?P<number>\d+)/delete$', views.delete)
]