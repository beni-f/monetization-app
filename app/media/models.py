from django.db import models
from account.models import CustomUser

# Create your models here.
class CategoryChoices(models.TextChoices):
    YOUTUBE = 'Youtube', 'Youtube'
    TIKTOK = 'Tiktok', 'Tiktok'
    INSTAGRAM = 'Instagram', 'Instagram'
    FACEBOOK = 'Facebook', 'Facebook'
    TELEGRAM = 'Telegram', 'Telegram'

class Media(models.Model):
    url = models.CharField(null=False)
    title = models.CharField(max_length=255, null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    views = models.IntegerField(default=0)
    category = models.CharField(max_length=255, choices=CategoryChoices.choices, default=CategoryChoices.YOUTUBE)
    coins = models.IntegerField(null=True, blank=True)
    duration = models.DurationField(null=True)

class WatchedMedia(models.Model):
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='watched_media'
    )
    media = models.ForeignKey(
        Media,
        on_delete=models.CASCADE,
        related_name='watched_by'
    )
    watched_at = models.DateTimeField(auto_now_add=True)
    duration = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ['user', 'media']
    
    def __str__(self):
        return f'{self.user.username} watched {self.media.url}'