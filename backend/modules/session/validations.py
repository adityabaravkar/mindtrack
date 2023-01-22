from marshmallow import fields, validate, Schema


class Assess(Schema):
    response = fields.String(required=True, validate=validate.OneOf(
        choices=['0', '1', '2', '3'],
        error='Response must be one of: 0, 1, 2, 3.'
    ),
        error_messages={
        'required': 'Response is mandatory field.',
        'invalid': 'Response is not valid.'
    })
    session = fields.String(required=True, error_messages={
        'required': 'Session is mandatory field.'
    })
