# Backend (Django)

## Prerequisites
- Python 3.11+
- pip
- (Optional) PostgreSQL if you want a real DB; otherwise SQLite works by default

## Setup (Windows PowerShell)
```powershell
cd backend
python -m venv .venv
. .venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Create Django project/app
```powershell
django-admin startproject core .
python manage.py startapp accounts
```

## Run migrations & dev server
```powershell
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

## Environment
Create a `.env` (optional if you want to customize):
```
SECRET_KEY=change-me
DEBUG=true
ALLOWED_HOSTS=*
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

The frontend will call `http://localhost:8000/api/...`.
