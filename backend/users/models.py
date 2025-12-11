from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Custom User Model for ReNova Market.
    Extends AbstractUser to allow future expansion (phone, address, etc.)
    without breaking foreign keys.
    """
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username
