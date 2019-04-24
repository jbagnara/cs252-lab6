from django.shortcuts import render, redirect
from django.utils.safestring import mark_safe
from . models import Score
import json

def home(request):
    return render(request, 'home.html')

def scores(request):
    scores = Score.objects.all()[:100]
    return render(request, 'scores.html', {'scores':scores})

def tetris(request, room_name):
    return render(request, 'tetris.html', {'room_name': mark_safe(json.dumps(room_name))})