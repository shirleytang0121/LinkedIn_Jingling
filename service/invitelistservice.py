from sqlalchemy import select, and_

from model.invitelist import InviteList
import json
from flask import make_response, jsonify, Response
import datetime
import logging



def to_dto(linkedin_account):
    return {
        "invite_time": linkedin_account.invite_time.strftime('%Y-%m-%d %H:%M:%S') if linkedin_account.invite_time is not None else None,
        "first_name": linkedin_account.first_name,
        "img": linkedin_account.img,
        "last_name": linkedin_account.last_name,
        "urn": linkedin_account.urn,
        "public_id": linkedin_account.public_id,
        "position": linkedin_account.position,
        "state": str(linkedin_account.state)
    }


def format_linkedin_accounts(linkedin_accounts, per_page, page, total_count):
    return json.dumps({
        "count": str(per_page),
        "data": list(map(to_dto, linkedin_accounts)),
        "page": str(page),
        "result": 1,
        "total": total_count
    })


class InviteListService:

    def __init__(self, db):
        self.db = db

    def add_invite_queue(self, data, user_linkedin, tag):
        try:
            invite_data = json.loads(data)
            urns = [item['urn'] for item in invite_data]
            exist_data = self.db.session.query(InviteList).filter(and_(InviteList.user_linkedin_id == user_linkedin, InviteList.urn.in_(urns))).all()
            exist_urns = set([exist.urn for exist in exist_data])
            filtered_data = [item for item in invite_data if item['urn'] not in exist_urns]
            new_records = [InviteList(
                public_id=item['public_id'],
                state=2,
                first_name=item['first_name'],
                last_name=item['last_name'],
                position=item['position'],
                img=item['img'],
                urn=item['urn'],
                user_linkedin_id=user_linkedin,
                invite_time=None
            ) for item in filtered_data]
            self.db.session.bulk_save_objects(new_records)
            self.db.session.commit()
            response_body = {
                "result": 1,
                "tag": tag
            }
            return json.dumps(response_body)
        except Exception as e:
            response_body = {
                "result": 2,
                "tag": tag
            }
            return json.dumps(response_body)

    def invite_from_queue(self, user_linkedin, data):
        try:
            query = self.db.session.query(InviteList).filter(and_(InviteList.user_linkedin_id == user_linkedin,
                                                                  InviteList.urn == data))
            exist_invite = query.first()
            exist_invite.invite_time = datetime.datetime.now()
            exist_invite.state = 1
            self.db.session.commit()
            self.db.session.refresh(exist_invite)
        except Exception as e:
            logging.error(str(e))



    def get_invite_queue(self, pagination, user_linkedin, tag):
        try:
            query = self.db.session.query(InviteList).filter(InviteList.user_linkedin_id == user_linkedin)
            if tag == '1' or tag == '2':
                query = query.filter(InviteList.state == tag)
            total_count = query.count()
            per_page = int(pagination['size'])
            page = int(pagination['page'])
            results = query.limit(per_page).offset((page - 1) * per_page).all()
            return format_linkedin_accounts(results, per_page, page, total_count)
        except Exception as e:
            response_body = {
                "result": 2,
            }
            return json.dumps(response_body)

    def remove_invite_queue(self, data, user_linkedin):
        try:
            query = self.db.session.query(InviteList).filter(InviteList.user_linkedin_id == user_linkedin)
            query = query.filter(InviteList.urn.in_(json.loads(data)))
            query.delete()
            self.db.session.commit()
            response_body = {
                "result": 1,
            }
            return json.dumps(response_body)
        except Exception as e:
            response_body = {
                "result": 2,
            }
            return json.dumps(response_body)
