from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('', views.home_view, name='home'),
    
    path('api/users/', views.get,   name='get'),
    path('api/users/<int:pk>/edit', views.put, name='put'),
    path('api/users/<int:pk>/delete', views.delete, name='delete'),
    path('api/users/add', views.post, name='post'),

    path('api/login/', views.login_user, name='login_user'),
    path('api/signup/', views.signup_user, name='signup_user'),


]

