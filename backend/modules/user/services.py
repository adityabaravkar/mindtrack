from .dao import User


class UserService:

    def __init__(self):
        self.dao = User()

    def register(self, request_body):
        id = self.dao.create_user(request_body)
        request_body['id'] = id
        del request_body['password']
        return request_body

    def get_user(self, request_body):
        user = self.dao.get_user(request_body)
        if user:
            user['id'] = str(user['_id'])
            del user['_id']
            return user, user.pop('password')

    def update_user(self, request_body):
        self.dao.update_user(request_body)
        updated_user = self.get_user(request_body)
        return updated_user[0]

    def get_user_by_id(self, user_id):
        user = self.dao.get_user_by_id(user_id)
        if user:
            user['id'] = str(user['_id'])
            del user['_id']
            del user['password']
            return user

    def get_therapists(self):
        return self.dao.get_users({'role': 'therapist'})
