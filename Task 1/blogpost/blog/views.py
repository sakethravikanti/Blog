from django.shortcuts import render, get_object_or_404, redirect
from .models import Blog
from django.core.paginator import Paginator
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import BlogSerializer
from django.contrib.auth.decorators import login_required

# Create your views here.


def display(request):
    posts = Blog.objects.all()  
    paginator = Paginator(posts, 5)  
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'base.html', {'page_obj': page_obj})

def otherdisplay(request):
    posts = Blog.objects.exclude(author=request.user) 
    # posts = Blog.objects.all()
    paginator = Paginator(posts, 5)  
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'base.html', {'page_obj': page_obj})

def userdisplay(request):
    posts = Blog.objects.filter(author=request.user) 
    # posts = Blog.objects.all()
    paginator = Paginator(posts, 5)  
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'base.html', {'page_obj': page_obj})

@login_required
def add(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        content = request.POST.get('content')
        Blog.objects.create(
            title=title, 
            content=content,
            author = request.user
           
        )
        return redirect('display')
    elif request.method == 'GET':
        return render(request, 'add.html',{'username':request.user.username})

@login_required
def edit(request, pk):
    post = get_object_or_404(Blog, pk=pk,author=request.user)
    if request.method == 'POST':
        title = request.POST.get('title')
        content = request.POST.get('content')
        post.title = title
        post.content = content
        post.save()
        return redirect('display')
    elif request.method == 'GET':
        return render(request, 'add.html', {'post': post,'username':request.user})
    

@login_required
def dele (request, pk):
    post = get_object_or_404(Blog, pk=pk)
    post.delete()
    return redirect('display')




@api_view(['GET'])
def get(request):
        posts = Blog.objects.all()
        serializer = BlogSerializer(posts, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def post(request):
        serializer = BlogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])

def delete(request, pk):
      blog = Blog.objects.get(id=pk)
      blog.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT'])
def put(request, pk):
        blog = Blog.objects.get(id=pk)
        serializer = BlogSerializer(instance=blog, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        