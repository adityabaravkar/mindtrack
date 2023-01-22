from config import MongoManager


class Connection:
    def __init__(self):
        self.connections = MongoManager.getInstance().connections

    def create_conn(self, conn):
        self.connections.insert_one(conn)

    def get_conn(self, conn):
        return self.connections.find(conn)