from .dao import Session
from modules.result.dao import Result
from .utilities import read_item_db, remove_item_by_idx, score, estimate_theta, next_item
from config import vars


class SessionService:

    def __init__(self):
        self.dao = Session()
        self.result_dao = Result()

    def start_session(self, user_id):
        item_db = read_item_db('/data/questions.csv')
        r = []
        bs = [item_db["b1"][0], item_db["b2"][0], item_db["b3"][0]]
        q = item_db["item"][0]

        item_db = remove_item_by_idx(item_db, 0)

        id = self.dao.create_session(user_id, item_db, r, bs)

        return {'status': 'started',
                'question': q,
                'session': str(id)}

    def assess_session(self, request_body):

        session_id = request_body['session']
        session_data = self.dao.get_session(session_id)
        r = session_data['r']
        bs = session_data['bs']
        theta = session_data['theta']
        item_db = session_data['item_db']
        user_id = session_data['user_id']

        response = request_body['response']

        r = r + score(int(response))
        theta = estimate_theta(r, bs, theta)

        if theta[1] < vars.SEM_THETA or len(r) == vars.MAX_ITEMS*3:
            std_score = str(round(((theta[0] - 1.40)/1.50)*15) + 100)
            self.result_dao.create_result(user_id, std_score, session_id)
            self.dao.delete_session(session_id)
            return {
                'status': 'complete',
                'score': std_score
            }

        next_i = next_item(theta[0], item_db)
        bs = bs + [next_i["b1"], next_i["b2"], next_i["b3"]]
        self.dao.update_session(session_id, item_db, r, bs, theta)
        return {
            'status': 'in progress',
            'question': next_i['item'],
            'session': session_id
        }
