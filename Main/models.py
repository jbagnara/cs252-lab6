from django.db import models
from django.utils import timezone

class Score(models.Model):
    score = models.IntegerField()
    name = models.CharField(max_length=20)
    date = models.DateField(default=timezone.now)

    def __str__(self):
        return self.name