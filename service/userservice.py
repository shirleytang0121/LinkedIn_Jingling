import string
import random
import re
from sqlalchemy import and_
from model.user import User
import json
from flask import make_response, jsonify, Response



def generate_random_string(length):
    characters = string.digits + string.ascii_uppercase
    random_string = ''.join(random.choice(characters) for _ in range(length))
    return random_string


def is_valid_email(email):
    # Define a regular expression for validating an Email
    regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    # Check if the email matches the regex pattern
    return re.match(regex, email) is not None


class UserService:

    def __init__(self, db):
        self.db = db

    def login(self, login_info):
        user = User(apn_email=login_info["email"], password=login_info["password"])
        existed_user = User.query.filter(User.apn_email == user.apn_email).first()
        response_body = None
        if existed_user:
            if existed_user.check_password(user.password):
                login_code = generate_random_string(6)
                existed_user.login_code = login_code
                self.db.session.commit()
                self.db.session.refresh(existed_user)
                response_body = json.dumps({
                    'result': 1,
                    'data': {
                        'account': existed_user.id,
                        'dia_time': '2099-12-30 23:59:59',
                        'level': 3,
                        'reg_time': '2099-12-30 23:59:59',
                        'sup_time': '2099-12-30 23:59:59',
                        'trial': 10,
                        'vip_time': '2099-12-30 23:59:59',
                    },
                    'login_code': login_code
                })
            else:
                response_body = json.dumps({'result': 2})
        else:
            response_body = json.dumps({'result': 0})
        return response_body

    def check_login_code(self, login_info):
        if login_info['login_code'] is '' or login_info['login_code'] is None:
            response_body = json.dumps({
                'result': 3,
                'tag': ""
            })
            return response_body
        existed_login = (User.query.filter(and_(User.id == login_info['id']))
                         .first())
        response_body = None
        if existed_login:
            if not (existed_login.login_code == login_info['login_code']):
                response_body = json.dumps({
                    'result': 6,
                    'tag': ""
                })
                return response_body
        return None



    def check_valid_register(self, user):
        existed = User.query.filter(User.apn_email == user.apn_email).first()
        if (not existed) and is_valid_email(user.apn_email):
            return True
        return False

    def register(self, user):
        user = User(apn_user_id=None, apn_email=user["email"], password=user["password"])
        response_body = None
        if self.check_valid_register(user):
            user.set_password(user.password)
            self.db.session.add(user)
            self.db.session.commit()
            self.db.session.refresh(user)
            return Response(response=json.dumps({
                "status": "success",
                "account": user.id,
                "email": user.apn_email}),
                status=201,
                mimetype='application/json')
        else:
            return Response(response=json.dumps({
                "status": "error",
                "message": "register account failed!"}),
                status=400,
                mimetype='application/json')




