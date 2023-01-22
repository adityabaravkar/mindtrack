from config import MongoManager
from werkzeug.security import generate_password_hash
from bson.objectid import ObjectId


class User:
    def __init__(self):
        self.users = MongoManager.getInstance().users

    def create_user(self, obj):
        id = self.users.insert_one({
            "email": obj['email'],
            "password": generate_password_hash(obj['password']),
            "firstName": obj['firstName'],
            "role": obj['role']
        })
        return str(id.inserted_id)

    def get_user_by_id(self, user_id):
        return self.users.find_one({'_id': ObjectId(user_id)})

    def get_user(self, obj):
        return self.users.find_one(obj)

    def update_user(self, obj):
        self.users.update_one(
            {'_id': ObjectId(obj['id'])},
            {'$set': obj}
        )

    def get_users(self, obj):
        return self.users.find(obj, {'_id': 0, 'password': 0})
