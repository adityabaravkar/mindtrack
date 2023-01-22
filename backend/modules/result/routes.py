from flask import Blueprint, jsonify
from .services import ResultService
from flask_jwt_extended import jwt_required, get_jwt_identity

result_bp = Blueprint('result', __name__)


@result_bp.get('/getResults')
@jwt_required()
def get_results():
    user_id = get_jwt_identity()
    data = ResultService().get_results(user_id)
    return jsonify(data)
