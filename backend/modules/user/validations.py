from marshmallow import fields, validate, Schema, validates, ValidationError
from .services import UserService


class Signup(Schema):

    email = fields.Email(required=True,
                         error_messages={
                             'required': 'Email is mandatory field.',
                             'invalid': 'Email is not valid.'
                         })
    password = fields.String(required=True,
                             validate=validate.Length(
                                 min=6, error='Password length should be minimum 6'),
                             error_messages={
                                 'required': 'Password is mandatory field.'
                             })
    firstName = fields.String(required=True,
                              error_messages={
                                  'required': 'Name is mandatory field.'
                              })
    role = fields.String(required=True,
                         validate=validate.OneOf(
                             choices=['patient', 'therapist']
                         ))

    @validates('email')
    def is_not_taken(self, value):
        if UserService().get_user({'email': value}):
            raise ValidationError("Email address is already taken.")


class Update(Schema):

    id = fields.String(required=True,
                       error_messages={
                           'required': 'Id is mandatory field.'
                       })
    firstName = fields.String(required=True,
                              error_messages={
                                  'required': 'First name is mandatory field.'
                              })
    lastName = fields.String()
    address = fields.String()
    city = fields.String()
    country = fields.String()
    postalCode = fields.Integer()
    phone = fields.String()
