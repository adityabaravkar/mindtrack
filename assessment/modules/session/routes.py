from flask import Blueprint, jsonify, request
from .services import SessionService
from .validations import Assess
from modules.utilities import getMessage
from flask_jwt_extended import jwt_required, get_jwt_identity

session_bp = Blueprint('session', __name__)


@session_bp.get('/start')
@jwt_required()
def start_session():
    user_id = get_jwt_identity()
    data = SessionService().start_session(user_id)
    return jsonify(data)


@session_bp.post('/assess')
@jwt_required()
def assess_session():
    json_body = request.json
    errors = Assess().validate(json_body)
    if errors:
        return jsonify(message=getMessage(errors)), 400
    data = SessionService().assess_session(json_body)
    return jsonify(data)
