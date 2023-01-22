from marshmallow import fields, Schema


class Connect(Schema):

    did = fields.String(required=True, error_messages={
        'required': 'Doctor Id is mandatory field.'})
    pid = fields.String(required=True, error_messages={
        'required': 'Patient Id is mandatory field.'})
    dname = fields.String(required=True, error_messages={
        'required': 'Doctor name is mandatory field.'})
    pname = fields.String(required=True, error_messages={
        'required': 'Patient name is mandatory field.'})
    score = fields.Integer(required=True, error_messages={
        'required': 'Score is mandatory field.'})
