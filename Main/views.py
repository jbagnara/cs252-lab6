from django.shortcuts import render, redirect
from django.utils.safestring import mark_safe
import json

# Create your views here.
def home(request):
    return render(request, 'home.html')

def tetris(request, room_name):
    return render(request, 'tetris.html', {'room_name': mark_safe(json.dumps(room_name))})