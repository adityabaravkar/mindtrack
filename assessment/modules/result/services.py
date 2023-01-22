from .dao import Result


class ResultService:

    def __init__(self):
        self.dao = Result()

    def get_results(self, user_id):
        results = self.dao.get_results(user_id)
        return results
