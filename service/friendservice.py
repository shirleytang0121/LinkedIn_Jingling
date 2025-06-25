from sqlalchemy import select, and_, text
from model.friend import Friend
from model.myfriend import MyFriend
from model.tidings import Tidings
import json
from flask import make_response, jsonify, Response
import datetime
import logging
from sqlalchemy.exc import SQLAlchemyError


class FriendService:

    def __init__(self, db):
        self.db = db

    def save_friend(self, friends_list, user_linkedin_id):
        try:
            myfriend_to_insert = []
            myfriend_to_update = []
            friends_to_insert = []
            result_data = []

            existing_myfriends = {f.urn: f for f in self.db.session.query(MyFriend).filter(MyFriend.urn.in_([f['urn'] for f in friends_list])).all()}
            existing_friends = {f.friend_urn: f for f in self.db.session.query(Friend).filter(and_(Friend.friend_urn.in_([f['urn'] for f in friends_list]), Friend.user_id == user_linkedin_id)).all()}

            for friend in friends_list:
                urn = friend['urn']
                
                if urn in existing_myfriends:
                    myfriend = existing_myfriends[urn]
                    myfriend.first_name = friend['first_name']
                    myfriend.last_name = friend['last_name']
                    myfriend.img = friend['img']
                    myfriend.position = friend['position']
                    myfriend.public_id = friend['public_id']
                    myfriend_to_update.append(myfriend)
                else:
                    myfriend_to_insert.append(MyFriend(
                        urn=urn,
                        first_name=friend['first_name'],
                        last_name=friend['last_name'],
                        img=friend['img'],
                        position=friend['position'],
                        public_id=friend['public_id'],
                        #is_prohibited=0
                    ))

                if urn in existing_friends:
                    friend_data = existing_friends[urn]
                    result_data.append({
                        'friend_urn': friend_data.friend_urn,
                        'dig_state': friend_data.dig_state,
                        'is_prohibit': friend_data.is_prohibit,
                        'send_queue': friend_data.send_queue,
                        'send_time': friend_data.send_time,
                        'remark': friend_data.remark,
                    })
                else:
                    new_friend = Friend(
                        user_id=user_linkedin_id,
                        friend_urn=urn,
                        dig_state=0,
                        is_prohibit=0,
                        send_time=None,
                        send_queue=0,
                        remark='',
                    )
                    friends_to_insert.append(new_friend)
                    result_data.append({
                        'friend_urn': urn,
                        'dig_state': 0,
                        'is_prohibit': 0,
                        'send_queue': 0,
                        'send_time': None,
                        'remark': '',
                    })

            if myfriend_to_insert:
                self.db.session.bulk_save_objects(myfriend_to_insert)
            if myfriend_to_update:
                self.db.session.bulk_save_objects(myfriend_to_update, update_changed_only=True)
            if friends_to_insert:
                self.db.session.bulk_save_objects(friends_to_insert)

            self.db.session.commit()
            return json.dumps({"result": 1, "data": result_data})

        except SQLAlchemyError as e:
            self.db.session.rollback()
            logging.error(f"Database error in save_friend: {str(e)}")
            return json.dumps({"result": 0})
        except Exception as e:
            self.db.session.rollback()
            logging.error(f"Unexpected error in save_friend: {str(e)}")
            return json.dumps({"result": 0})
    
    def edit_remark(self,user_linkedin_id,friend_urn,value,tag):
        exist_friend = Friend.query.filter(and_(Friend.user_id==user_linkedin_id,Friend.friend_urn==friend_urn)).first()
        if exist_friend:
            exist_friend.remark = value
            self.db.session.commit()
            return json.dumps({"result": 1, "urn":friend_urn,"remark":value,"tag":tag })
        else:
            return json.dumps({"result": 0})

    def get_send_for_friend(self,user_linkedin_id,friend_urns):
        exist_friends = MyFriend.query.filter(MyFriend.urn.in_(friend_urns)).all()
        select_tidings = Tidings.query.filter(and_(Tidings.user_id == user_linkedin_id, Tidings.is_select == '1')).all()
        if exist_friends and select_tidings:
            friends_list = [{
                "urn": friend.urn,
                "first_name": friend.first_name,
                "last_name":friend.last_name,
                "img":friend.img
            }
             for friend in exist_friends
            ]

            tidings_list = [{
                "tidings": tiding.tidings
            }
            for tiding in select_tidings
            ]
            return json.dumps({"result": 1, "tidings":tidings_list, "data":friends_list})
        else:
            return json.dumps({"result": 0})
        
    def save_send_record(self,user_linkedin_id,friend_urn):
        exist_friend = Friend.query.filter(and_(Friend.user_id==user_linkedin_id,Friend.friend_urn==friend_urn)).first()
        if exist_friend:
            exist_friend.send_time = datetime.datetime.now().strftime('%Y-%m-%d')
            self.db.session.commit()
            return json.dumps({"result": 1 })
        else:
            return json.dumps({"result": 0})

    def get_send_for_auto(self,user_linkedin_id,friend_urns):
        exist_friends = MyFriend.query.filter(MyFriend.urn.in_(friend_urns)).all()
        if exist_friends:
            friends_list = [{
                "urn": friend.urn,
                "first_name": friend.first_name,
                "last_name":friend.last_name,
                "img":friend.img
            }
             for friend in exist_friends
            ]
            return json.dumps({"result": 1, "data":friends_list})
        else:
            return json.dumps({"result": 0})
        










    



