from sqlalchemy import select

from model.invitelist import InviteList
import json
from flask import make_response, jsonify, Response
import datetime


class InviteListService:

    def __init__(self, db):
        self.db = db

    def add_invite_queue(self, data, user_linkedin, tag):
        try:
            invite_data = json.loads(data)
            urns = [item['urn'] for item in invite_data]
            exist_data = self.db.session.query(InviteList.urn).filter(InviteList.urn.in_(urns)).all()
            exist_urns = set(exist['urn'] for exist in exist_data)
            filtered_data = [item for item in data if item['urn'] not in exist_urns]
            new_records = [InviteList(
                public_id=item['public_id'],
                state=2,
                first_name=item['first_name'],
                last_name=item['last_name'],
                position=item['position'],
                img=item['img'],
                urn=item['urn'],
                user_linkedin_id=user_linkedin['id'],
                invite_time=datetime.datetime.now()
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
