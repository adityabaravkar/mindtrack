from flask import Blueprint, jsonify, request
from werkzeug.security import check_password_hash
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from .validations import Signup, Update
from modules.utilities import getMessage
from .services import UserService

user_bp = Blueprint('user', __name__)


@user_bp.post('/signup')
def register():
    json_body = request.json
    errors = Signup().validate(json_body)
    if errors:
        return jsonify(message=getMessage(errors)), 400
    saved_user = UserService().register(json_body)
    token = create_access_token(identity=saved_user['id'])
    return jsonify({
        'message': 'success',
        'user': saved_user,
        'token': token
    }), 200


@user_bp.post('/login')
def login():
    json_body = request.json
    user, pass_hash = UserService().get_user({'email': json_body['email']})
    if user:
        is_pass_correct = check_password_hash(pass_hash, json_body['password'])
        if is_pass_correct:
            token = create_access_token(identity=user['id'])
            return jsonify({
                'message': 'success',
                'user': user,
                'token': token
            }), 200
        return jsonify({
            'message': 'Wrong credentials'
        }), 401
    return jsonify({
        'message': 'No user associated with '+json_body.email
    }), 404


@user_bp.post('/update')
@jwt_required()
def update():
    json_body = request.json
    errors = Update().validate(json_body)
    if errors:
        return jsonify(message=getMessage(errors)), 400
    user = UserService().update_user(json_body)
    return jsonify(user), 200


@user_bp.get('/detail')
@jwt_required()
def user_details():
    user_id = get_jwt_identity()
    user = UserService().get_user_by_id(user_id)
    return jsonify(user), 200


@user_bp.get('/getDoctors')
@jwt_required()
def get_therapists():
    users = UserService().get_therapists()
    # print('Type: '+str(type(users)))
    return jsonify(list(users)), 200
