from flask import Blueprint, jsonify, request
from .validations import Connect
from modules.utilities import getMessage
from .services import ConnectionService
from flask_jwt_extended import jwt_required, get_jwt_identity

connection_bp = Blueprint('connection', __name__)


@connection_bp.post('/connect')
@jwt_required()
def connect():
    json_body = request.json
    errors = Connect().validate(json_body)
    if errors:
        return jsonify(message=getMessage(errors)), 400
    ConnectionService().create_conn(json_body)
    return jsonify({'message': 'success'}), 200

@connection_bp.get('/myPatients')
@jwt_required()
def get_my_patients():
    user_id = get_jwt_identity()
    patients = ConnectionService().get_conn({'did': user_id})
    return jsonify(list(patients)), 200