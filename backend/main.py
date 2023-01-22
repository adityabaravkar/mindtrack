from flask import Flask, jsonify
from modules.session import session_bp
from modules.result import result_bp
from modules.user import user_bp
from modules.connection import connection_bp
from flask_cors import CORS
from config import MongoManager
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config.from_pyfile('config/vars.py')
app.register_blueprint(user_bp)
app.register_blueprint(session_bp)
app.register_blueprint(result_bp)
app.register_blueprint(connection_bp)

CORS(app)
MongoManager.set_app(app)
JWTManager(app)


@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404


if __name__ == '__main__':
    app.run(port=app.config.get("PORT"), debug=True)
