
from django.urls import path
from . import views


urlpatterns= [
    path('display/', views.display, name='display'),
    path('add/', views.add, name='add'),
    path('<int:pk>/edit/', views.edit, name='edit'),
    path('<int:pk>/delete/', views.dele, name='dele'),
    path('api/posts/', views.get,   name='get'),
    path('api/posts/<int:pk>/edit', views.put, name='put'),
    path('api/posts/<int:pk>/delete', views.delete, name='delete'),
    path('api/posts/add', views.post, name='post'),
    path('userdisplay/', views.userdisplay, name='userdisplay'),
    path('otherdisplay/', views.otherdisplay, name='otherdisplay'),
    
]   