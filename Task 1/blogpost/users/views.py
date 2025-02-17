from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages  # For flash messages
from .forms import UserSignupForm, UserLoginForm
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import UserSerializer

def signup_view(request):
    if request.method == 'POST':
        form = UserSignupForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Signup successful! Welcome, {}".format(user.username))
            return redirect('home')
        else:
            # Log the errors for debugging
            messages.error(request, "Signup failed. Please correct the errors below.")
            print(form.errors)
    else:
        form = UserSignupForm()
    return render(request, 'users/signup.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = UserLoginForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, "Login successful! Welcome back, {}".format(user.username))
            return redirect('home')
        else:
            messages.error(request, "Invalid username or password. Please try again.")
    else:
        form = UserLoginForm()
    return render(request, 'users/login.html', {'form': form})

@login_required
def home_view(request):
    return render(request, 'users/home.html', {'username': request.user.username})

def logout_view(request):
    logout(request)
    messages.info(request, "You have been logged out successfully.")
    return redirect('login')

@api_view(['GET'])
def get(request):
        posts = User.objects.all()
        serializer = UserSerializer(posts, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def post(request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])

def delete(request, pk):
      blog = User.objects.get(id=pk)
      blog.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT'])
def put(request, pk):
        blog = User.objects.get(id=pk)
        serializer = UserSerializer(instance=blog, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def signup_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if User.objects.filter(username=username).exists():
        return Response({"detail": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(username=username, password=password)
    user.save()
    return Response({"detail": "Account created successfully"}, status=status.HTTP_201_CREATED)
@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({"detail": "Login successful"}, status=status.HTTP_200_OK)
    else:
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)