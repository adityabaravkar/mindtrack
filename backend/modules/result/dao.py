from config import MongoManager
import datetime


class Result:
    def __init__(self):
        self.results = MongoManager.getInstance().results

    def create_result(self, user_id, std_score, session_id):
        self.results.insert_one({
            "userId": user_id,
            "score": std_score,
            "session": session_id,
            "dt": datetime.datetime.utcnow()
        })

    def get_results(self, user_id):
        return self.results.find_many({'userId': user_id})
