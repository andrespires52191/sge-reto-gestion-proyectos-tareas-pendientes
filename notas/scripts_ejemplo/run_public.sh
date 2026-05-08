#!/bin/bash 
python manage.py runserver & 
sleep 2 
ngrok http 8000
