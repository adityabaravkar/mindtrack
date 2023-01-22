from bson.objectid import ObjectId
from config import MongoManager


class Session:
    def __init__(self):
        self.sessions = MongoManager.getInstance().sessions

    def create_session(self, user_id, item_db, r, bs):
        id = self.sessions.insert_one({
            "r": r,
            "bs": bs,
            "theta": [3],
            "item_db": item_db,
            "user_id": user_id
        })
        return id.inserted_id

    def get_session(self, session_id):
        return self.sessions.find_one({'_id': ObjectId(session_id)})

    def update_session(self, session_id, item_db, r, bs, theta):
        self.sessions.update_one(
            {'_id': ObjectId(session_id)},
            {
                "$set": {
                    "r": r,
                    "bs": bs,
                    "theta": theta,
                    "item_db": item_db
                }
            }
        )

    def delete_session(self, session_id):
        self.sessions.delete_one({'_id': ObjectId(session_id)})
