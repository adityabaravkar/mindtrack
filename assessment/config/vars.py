from os import environ
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

MONGO_URI = environ.get('MONGO_URI')
PORT = environ.get('PORT')
JWT_SECRET_KEY = environ.get('JWT_SECRET_KEY')
SEM_THETA = environ.get('SEM_THETA')
MAX_ITEMS = environ.get('MAX_ITEMS')
