from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now 

class Blog (models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,  # Delete posts if the user is deleted
        related_name='posts'       # Optional: For reverse lookup (user.posts.all())
    )
    # created_at = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(default=now)