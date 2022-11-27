from os import environ
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

MONGO_URI = environ.get('MONGO_URI')
PORT = environ.get('PORT')
SECRET_KEY = environ.get('SECRET_KEY')
