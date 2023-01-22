from .dao import Connection


class ConnectionService:

    def __init__(self):
        self.dao = Connection()

    def create_conn(self, request_body):
        self.dao.create_conn(request_body)

    def get_conn(self, request_body):
        return self.dao.get_conn(request_body)