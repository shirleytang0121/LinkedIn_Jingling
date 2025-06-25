from sqlalchemy import select, and_
from model.tidings import Tidings
from model.friend import Friend
from model.myfriend import MyFriend
import json
from flask import make_response, jsonify, Response
import datetime
import logging
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime, timedelta
from sqlalchemy import or_

class TidingsService:
    def __init__(self, db):
        self.db = db
    
    def get_tidings(self,user_linkedin_id):
        try:
            all_tidings = Tidings.query.filter(Tidings.user_id == user_linkedin_id).all()
            if all_tidings:
                tidings_list = [{
                    "tidings_id": tidings_item.create_time,
                    "tidings_title":tidings_item.tidings_title,
                    "tidings":tidings_item.tidings,
                    "is_select":tidings_item.is_select
                }
                for tidings_item in all_tidings
                ]
                return json.dumps({"result": 1,"data":tidings_list})
            else:
                return json.dumps({"result": 1,"data":[]})
        except SQLAlchemyError as e:
            self.db.session.rollback()
            logging.error(e)
            response_body={
                "result": 0,
                }
            return json.dumps(response_body)

    
    def save_tidings(self, user_linkedin_id, tidings_title, tidings_content, create_time):
        try:
            # 先查找是否存在匹配的记录
            existing_tidings = self.db.session.query(Tidings).filter(
                Tidings.user_id == user_linkedin_id,
                Tidings.create_time == create_time
            ).first()

            if existing_tidings:
                # 如果记录存在，更新它
                existing_tidings.tidings_title = tidings_title
                existing_tidings.tidings = tidings_content
                existing_tidings.is_select = '1'
            else:
                # 如果记录不存在，创建新记录
                new_tidings = Tidings(
                    user_id=user_linkedin_id,
                    tidings_title=tidings_title,
                    tidings=tidings_content,
                    is_select='1',
                    create_time=create_time
                )
                self.db.session.add(new_tidings)

            self.db.session.commit()
            
            response_body = {
                "result": 1,
                "message": "Update successfully" if existing_tidings else "Insert successfully"
            }
            return json.dumps(response_body)

        except SQLAlchemyError as e:
            self.db.session.rollback()
            logging.error(f"Error in save_tidings: {str(e)}")
            response_body = {
                "result": 0,
                "message": "Operation failed"
            }
            return json.dumps(response_body)
            
    def delete_tidings(self,user_linkedin_id):
        try:
            query = self.db.session.query(Tidings).filter(and_(Tidings.user_id == user_linkedin_id, 
                                                                     Tidings.is_select == '1'))
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

    def select_tidings(self, user_linkedin_id,tidings_id,is_select):
        try:
            query = self.db.session.query(Tidings).filter(and_(Tidings.user_id == user_linkedin_id,
                                                        Tidings.create_time == tidings_id))
            tidings_record = query.first()
            tidings_record.is_select = is_select
            self.db.session.commit()
            self.db.session.refresh(tidings_record)
            response_body={
                "result": 1, 
                "tidings_id": tidings_id, 
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
    
    def select_all_tidings(self, is_select, total_tidings, user_linkedin_id):
        try:
            query = self.db.session.query(Tidings).filter(Tidings.user_id == user_linkedin_id)
            query.update({Tidings.is_select: is_select})
            self.db.session.commit()
            response_body={
                "result": 1, 
                "action": is_select, 
                "count": total_tidings
                }
            return json.dumps(response_body)
        except SQLAlchemyError as e:
            self.db.session.rollback()
            logging.error(e)
            response_body={
                "result": 0, 
                "action": is_select, 
                "count": total_tidings
                }
            return json.dumps(response_body)

    def get_send_for_group(self,group_id,tag,other,user_linkedin_id):
        try:
            # print('tag '+tag)
            # print('other '+other)
            current_date = datetime.now().date()
            tag_days = int(tag)
            
            friends_urn = self.db.session.query(Friend.friend_urn).filter(
                Friend.group_id == group_id,
                Friend.user_id == user_linkedin_id,
                Friend.is_prohibit == 0,
                or_(
                    Friend.send_time == None,
                    Friend.send_time <= current_date - timedelta(days=tag_days)
                )
            ).all()
  
            # friends_urn = self.db.session.query(Friend.friend_urn).filter(Friend.group_id == group_id, Friend.user_id == user_linkedin_id).all()
            friends = self.db.session.query(MyFriend).filter(MyFriend.urn.in_([urn[0] for urn in friends_urn])).all()
            data_return = [
                {
                    'first_name':friend.first_name,
                    'img':friend.img,
                    'last_name':friend.last_name,
                    'urn':friend.urn,
                } for friend in friends]

            tidings = self.db.session.query(Tidings.tidings).filter(Tidings.is_select == 1, Tidings.user_id == user_linkedin_id).all()
            tidings_return = [
                {
                    'tidings': tiding[0] 
                } for tiding in tidings
            ]
            response_body={
                "data": data_return, 
                "result": 1, 
                "tidings": tidings_return
                }
            # print(response_body)
            return json.dumps(response_body)
        except SQLAlchemyError as e:
            logging.error(e)
            response_body={
                "data": [], 
                "result": 0, 
                "tidings": []
                }
            # print('2: '+response_body)
            return json.dumps(response_body)
        except Exception as e:
            logging.error(e)
            response_body={
                "data": [], 
                "result": 0, 
                "tidings": []
                }
            # print('3: '+response_body)
            return json.dumps(response_body)

    def start_send_for_group(self, user_linkedin_id):
        try:
            tidings = self.db.session.query(Tidings.tidings).filter(Tidings.is_select == 1, Tidings.user_id == user_linkedin_id).all()
            tidings_return = [
                {
                    'tidings': tiding[0] 
                } for tiding in tidings
            ]
            response_body={
                "result": 1, 
                "data": tidings_return
                }
            # print(response_body)
            return json.dumps(response_body)
        except SQLAlchemyError as e:
            logging.error(e)
            response_body={
                "result": 0, 
                "data": []
                }
            # print('2: '+response_body)
            return json.dumps(response_body)
        except Exception as e:
            logging.error(e)
            response_body={
                "result": 0, 
                "data": []
                }
            # print('3: '+response_body)
            return json.dumps(response_body)

        







