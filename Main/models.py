from django.db import models

class Score(models.Model):
    score = models.IntegerField()
    room_name = models.CharField(max_length=20)
    date = models.DateField()