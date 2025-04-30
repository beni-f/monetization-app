from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    coins = models.IntegerField(default=0)
    videos_watched = models.IntegerField(default=0)
    watch_limit = models.PositiveIntegerField(default=1, null=True, blank=True)
    coin_multiplier = models.FloatField(default=1.0, null=True, blank=True)
    subscription = models.CharField(null=False, blank=False, default='Basic')
    referral_code = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.username
