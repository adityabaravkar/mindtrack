from flask_pymongo import PyMongo


class MongoManager:
    __instance = None
    __app = None
    @staticmethod 
    def getInstance():
        if MongoManager.__instance == None:
            MongoManager()
        return MongoManager.__instance.db
    def __init__(self):
        if MongoManager.__instance != None:
            raise Exception("Singleton class MongoManager")
        if MongoManager.__app == None:
            raise Exception("App not assigned in MongoManager")
        MongoManager.__instance = PyMongo(MongoManager.__app)
    @staticmethod
    def set_app(app):
        MongoManager.__app = app
