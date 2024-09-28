import string
import random
import re
from sqlalchemy import and_
from model.userlinkedinaccount import UserLinkedinAccount
import json
from flask import make_response, jsonify, Response
import datetime
import json

    
def to_dto(account):
    return {
        "bind_time": account.bind_time.strftime('%Y-%m-%d %H:%M:%S') if isinstance(account.bind_time, datetime.datetime) else account.bind_time,
        "first_name": account.first_name,
        "img": account.img,
        "last_name": account.last_name,
        "my_urn": account.my_urn,
        "unbind": account.unbind
    }


def format_linkedin_accounts(accounts):
    return json.dumps({
        "data": list(map(to_dto, accounts)),
        "result": 1
    })


class UserLinkedinAccountService:

    def __init__(self, db):
        self.db = db

    def bind_account(self, linkedin_account):
        response_body = None
        exist_account = self.db.session.query(UserLinkedinAccount).filter(
            UserLinkedinAccount.my_urn == linkedin_account['data']['my_urn']).first()
        if exist_account is not None:
            response_body = json.dumps({
                "data": linkedin_account['data'],
                "result": 0,
                "show": True
            })
            return response_body
        accounts = self.db.session.query(UserLinkedinAccount).filter(
            UserLinkedinAccount.user_id == linkedin_account['user_id']).all()
        linkedin_account['data'] = json.loads(linkedin_account['data'])
        if len(accounts) >= 5:
            response_body = json.dumps({
                "data": linkedin_account['data'],
                "result": 2,
                "show": True
            })
            return response_body
        else:
            try:
                account_urns = set(account.my_urn for account in accounts)
                if linkedin_account['data']['my_urn'] in account_urns:
                    response_body = json.dumps({
                        "data": linkedin_account['data'],
                        "result": 1,
                        "show": False
                    })
                    return response_body
                user_linkedin_account = UserLinkedinAccount(user_id=linkedin_account['user_id'],
                                                            my_urn=linkedin_account['data']['my_urn'],
                                                            first_name=linkedin_account['data']['first_name'],
                                                            last_name=linkedin_account['data']['last_name'],
                                                            public_id=linkedin_account['data']['public_id'],
                                                            img=linkedin_account['data']['img'], bind_time=datetime.datetime.now(),
                                                            unbind=0)
                self.db.session.add(user_linkedin_account)
                self.db.session.commit()
                self.db.session.refresh(user_linkedin_account)
                response_body = json.dumps({
                    "data": linkedin_account['data'],
                    "result": 1,
                    "show": True
                })
                return response_body
            except Exception as e:
                response_body = json.dumps({
                    "data": linkedin_account['data'],
                    "result": 0,
                    "show": True
                })
                return response_body

    def get_bind_accounts(self, user_id):
        accounts = self.db.session.query(UserLinkedinAccount).filter(
            UserLinkedinAccount.user_id == user_id).all()
        response_body = format_linkedin_accounts(accounts)
        return response_body

    def get_bind_account_id(self, user_id, urn):
        res = self.db.session.query(UserLinkedinAccount).filter(
            and_(UserLinkedinAccount.user_id == user_id, UserLinkedinAccount.my_urn == urn)).first()
        return res.id

    def get_user_id(self, urn):
        res = self.db.session.query(UserLinkedinAccount).filter(UserLinkedinAccount.my_urn == urn).first()
        return res.user_id
