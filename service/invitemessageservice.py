from sqlalchemy import select, and_
from model.invitemessage import InviteMessage
import json
from flask import make_response, jsonify, Response
import datetime
import logging
from sqlalchemy.exc import SQLAlchemyError

def to_dto(message, senior):
    return {
        "mess_id": str(message.create_time),
        "mess": message.mess[:200] if senior == 'false' else message.mess[:300],
        "is_select": message.is_select,
    }

def format_messages(messages, senior):
    return json.dumps({
        "data": list(map(lambda msg: to_dto(msg, senior), messages)),
        "result": 1,
        "tag": ""
    })

class InviteMessageService:

    def __init__(self, db):
        self.db = db

    def get_mes(self, senior, user_linkedin_id):
        try:
            messages = self.db.session.query(InviteMessage).filter(InviteMessage.user_id == user_linkedin_id).all()
            return format_messages(messages, senior)
        except SQLAlchemyError as e:
            logging.error(e)
            response_body = {
                "result": 0,
            }
            return json.dumps(response_body)
    
    def select_mes(self, mess_id, is_select, user_linkedin_id):
        try:
            query = self.db.session.query(InviteMessage).filter(and_(InviteMessage.user_id == user_linkedin_id,
                                                        InviteMessage.create_time == mess_id))
            mess_record = query.first()
            mess_record.is_select = is_select
            self.db.session.commit()
            self.db.session.refresh(mess_record)
            response_body={
                "result": 1, 
                "tidings_id": mess_id, 
                "action": is_select
                }
            return json.dumps(response_body)
        except SQLAlchemyError as e:
            self.db.session.rollback()
            logging.error(e)
            response_body={
                "result": 0, 
                "tidings_id": "", 
                "action": is_select
                }
            return json.dumps(response_body)
        
    def select_all_mes(self, is_select, total_message, user_linkedin_id):
        try:
            query = self.db.session.query(InviteMessage).filter(InviteMessage.user_id == user_linkedin_id)
            query.update({InviteMessage.is_select: is_select})
            self.db.session.commit()
            response_body={
                "result": 1, 
                "action": is_select, 
                "count": total_message
                }
            return json.dumps(response_body)
        except SQLAlchemyError as e:
            self.db.session.rollback()
            logging.error(e)
            response_body={
                "result": 0, 
                "action": is_select, 
                "count": total_message
                }
            return json.dumps(response_body)
    
    def save_mes(self, create_time, message_content, user_linkedin_id):
        try:
            query = self.db.session.query(InviteMessage).filter(and_(InviteMessage.user_id == user_linkedin_id,
                                                        InviteMessage.create_time == create_time))
            mess_record = query.first()
            if mess_record:
                mess_record.mess = message_content
            else:
                mess_record = InviteMessage(
                    user_id=user_linkedin_id,
                    mess=message_content,
                    is_select=1,
                    create_time=create_time
                )
                self.db.session.add(mess_record)
            self.db.session.commit()
            self.db.session.refresh(mess_record)
            response_body={
                "result": 1,
                }
            return json.dumps(response_body)
        except SQLAlchemyError as e:
            self.db.session.rollback()
            logging.error(e)
            response_body={
                "result": 0,
                }
            return json.dumps(response_body)
        
    def delete_mes(self, user_linkedin_id):
        try:
            query = self.db.session.query(InviteMessage).filter(and_(InviteMessage.user_id == user_linkedin_id, 
                                                                     InviteMessage.is_select == 1))
            query.delete()
            self.db.session.commit()
            response_body={
                "result": 1,
                }
            return json.dumps(response_body)
        except SQLAlchemyError as e:
            self.db.session.rollback()
            logging.error(e)
            response_body={
                "result": 0,
                }
            return json.dumps(response_body)
        
        
        