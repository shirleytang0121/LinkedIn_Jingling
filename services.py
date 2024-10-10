from flask import Flask, request, Response
from flask_cors import CORS
from extensions import db

import httpUtils
import util
from dao import DAO
from util import format_response, get_user_id
from config import Config
from dataconfig import Config as DataConfig
import json
from service.userservice import UserService, check_urn
from service.userlinkedinaccountservice import UserLinkedinAccountService
from service.invitelistservice import InviteListService
from service.invitemessageservice import InviteMessageService
from service.linklistservice import LinkListService
app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes
app.config.from_object(DataConfig)
# app.config['SQLALCHEMY_DATABASE_URI'] = DataConfig.SQLALCHEMY_DATABASE_URI
db.init_app(app)
db_config = Config.get_db_config()
dao = DAO(db_config)


@app.route('/api/messages', methods=['POST'])
def handle_messages():
    data = request.form
    print(data['action'])

    if data['action'] == 'login':
        login_info = {"email": data['data'], "password": data['other']}
        response_body = UserService(db).login(login_info)
        return response_body

    if data['action'] == 'logout':
        return UserService(db).logout(data['login_code'])

    if data['action'] == 'register':
        user = {'email': data['email'], 'password': data['password'], 'apn_user_id': data['apn_user_id'], 'secret': data['secret']}
        return UserService(db).register(user)

    login_info = {'id': data['account'], 'login_code': data['login_code']}
    login_res = UserService(db).check_login_code(login_info)
    if login_res:
        return login_res

    if data['action'] == 'getBind':
        return UserLinkedinAccountService(db).get_bind_accounts(data['account'])

    if data['action'] == 'bindLinkedin':
        linkedin_account = {'data': data['data'], 'user_id': data['account']}
        return UserLinkedinAccountService(db).bind_account(linkedin_account)

    if check_urn(data['my_urn']):
        return check_urn(data['my_urn'])

    # Section: 邀请消息模板
    if data['action'] == 'getMes':
        user_linkedin_id = UserLinkedinAccountService(db).get_bind_account_id(data["account"], data["my_urn"])
        return InviteMessageService(db).get_mes(data['other'], user_linkedin_id)
    
        # try:
        #     print(data)
        #     # 1. fetch user_id condition
        #     account = data['account']
        #     my_urn = data['my_urn']
        #     senior = data['other']
        #     user_id = get_user_id(dao, account, my_urn)
        #     conditions = {'user_id': user_id}

        #     # 2. search results
        #     messages, error = dao.find('message', conditions, columns='create_time, mess, is_select')
        #     # Convert 'id' to 'mess_id' and ensure it's a string
        #     if error:
        #         return format_response(False)
        #     for message in messages:
        #         message['mess_id'] = str(message.pop('create_time'))
        #         if senior == 'false':
        #             message['mess'] = message['mess'][:200]
        #         else:
        #             message['mess'] = message['mess'][:300]
        #     print(messages)
        #     return format_response(True, messages)
        # except:
        #     return format_response(False)

    if data['action'] == 'selectMes':
        user_linkedin_id = UserLinkedinAccountService(db).get_bind_account_id(data["account"], data["my_urn"])
        return InviteMessageService(db).select_mes(data['data'], data['other'], user_linkedin_id)
    
        # try:
        #     account = data['account']
        #     my_urn = data['my_urn']
        #     mess_id = data['data']
        #     is_select = data['other']

        #     # 1. fetch user_id condition
        #     user_id = get_user_id(dao, account, my_urn)
        #     update_data = {'is_select': is_select}
        #     conditions = {
        #         'user_id': user_id,
        #         'create_time': mess_id
        #     }
        #     print(conditions)

        #     success, error = dao.update('message', update_data, conditions)
        #     if error:
        #         print(f"Error in updateMessageIsSelect: {error}")
        #         return json.dumps({"result": 0, "tidings_id": "", "action": is_select})
        #     return json.dumps({"result": 1, "tidings_id": mess_id, "action": is_select})
        # except Exception as e:
        #     print(f"Error in updateMessageIsSelect: {str(e)}")
        #     return json.dumps({"result": 0, "tidings_id": "", "action": is_select})

    if data['action'] == 'selectAllMes':
        user_linkedin_id = UserLinkedinAccountService(db).get_bind_account_id(data["account"], data["my_urn"])
        return InviteMessageService(db).select_all_mes(data['data'], data.get('other', None), user_linkedin_id)
    
        # try:
        #     account = data['account']
        #     my_urn = data['my_urn']
        #     is_select = data['data']
        #     total_message = data.get('other', None)

        #     # 1. fetch user_id condition
        #     user_id = get_user_id(dao, account, my_urn)

        #     update_data = {'is_select': is_select}
        #     conditions = {
        #         'user_id': user_id
        #     }
        #     success, error = dao.update('message', update_data, conditions)
        #     if error:
        #         print(f"Error in updateMessageIsSelect: {error}")
        #         return json.dumps({"result": 0, "action": is_select, "count": total_message})
        #     return json.dumps({"result": 1, "action": is_select, "count": total_message})
        # except Exception as e:
        #     print(f"Error in updateMessageIsSelect: {str(e)}")
        #     return json.dumps({"result": 0, "action": is_select, "count": total_message})

    if data['action'] == 'saveMes':
        user_linkedin_id = UserLinkedinAccountService(db).get_bind_account_id(data["account"], data["my_urn"])
        return InviteMessageService(db).save_mes(data['data'], data['other'], user_linkedin_id)
    
        # try:
        #     account = data['account']
        #     my_urn = data['my_urn']
        #     create_time = data['data']
        #     message_content = data['other']

        #     # 1. fetch user_id condition
        #     user_id = get_user_id(dao, account, my_urn)

        #     # 2. check if this message exist
        #     conditions={'user_id':user_id, 'create_time':create_time}
        #     message_id, error = dao.find('message', conditions, columns='id')
        #     if message_id:
        #         update_data = {'mess': message_content}
        #         conditions = {
        #             'id': message_id[0]['id']
        #         }
        #         success, error = dao.update('message', update_data, conditions)
        #     else:
        #         # save message
        #         dao.insert('message',
        #                 {'user_id': user_id, 'mess': message_content, 'is_select': 1, 'create_time': create_time})

        #     return json.dumps({"result": 1})
        # except:
        #     return json.dumps({"result": 0})

    if data['action'] == 'deleteMes':
        user_linkedin_id = UserLinkedinAccountService(db).get_bind_account_id(data["account"], data["my_urn"])
        return InviteMessageService(db).delete_mes(user_linkedin_id)
    
        # try:
        #     account = data['account']
        #     my_urn = data['my_urn']
        #     # 1. fetch user_id condition
        #     user_id = get_user_id(dao, account, my_urn)

        #     # delete message
        #     dao.delete('message', {'user_id': user_id, 'is_select': 1})

        #     return json.dumps({"result": 1})
        # except:
        #     return json.dumps({"result": 0})

    # Section: 链接加人
    if data['action'] == 'getLine':
        user_linkedin_id = UserLinkedinAccountService(db).get_bind_account_id(data["account"], data["my_urn"])
        return LinkListService(db).get_line(int(data.get('data', 1)), 100, 'line', user_linkedin_id)
        # try:
        #     # 1. fetch user_id condition
        #     account = data['account']
        #     my_urn = data['my_urn']
        #     user_id = get_user_id(dao, account, my_urn)
        #     page = int(data.get('data', 1))
        #     items_per_page = 100
        #     connect_type = 'line'

        #     status_conditions = {'user_id': user_id, 'type': connect_type, 'status': None}
        #     count_result = dao.count('linkedin_connect', status_conditions)
        #     total = count_result[0][0]['total'] if count_result else 0
        #     print(total)
        #     offset = (page - 1) * items_per_page
        #     query = """
        #     SELECT user_id, websites 
        #     FROM linkedin_connect 
        #     WHERE user_id = %s AND type = %s AND (status IS NULL OR status = '')
        #     LIMIT %s OFFSET %s
        #     """
        #     urls, _ = dao.execute_query(query, (user_id, connect_type, items_per_page, offset))
        #     print(urls)
        #     # print(json.dumps({"total": str(total), "result": 1, "data": urls, "count": 100, "page": str(page)}))
        #     print(json.dumps({"total": str(total), "result": 1, "data": urls, "count": 100, "page": str(page)}))
        #     return json.dumps({"total": str(total), "result": 1, "data": urls, "count": 100, "page": str(page)})
        # except Exception as e:
        #     print(f"Error in handle_messages: {str(e)}")
        #     return json.dumps({"total": "0", "result": 0, "data": [], "count": 100, "page": str(page), "error": str(e)})

    if data['action'] == 'newLine':
        user_linkedin_id = UserLinkedinAccountService(db).get_bind_account_id(data["account"], data["my_urn"])
        return LinkListService(db).new_line(json.loads(data['data']),'line', user_linkedin_id)

        # try:
        #     # 1. fetch user_id condition
        #     account = data['account']
        #     my_urn = data['my_urn']
        #     new_urls = json.loads(data['data'])
        #     connect_type = 'line'
        #     user_id = get_user_id(dao, account, my_urn)

        #     # 2. exclude the new_url in new_urls if exist in linkedin_connect
        #     existing_urls, error = dao.find_with_custom_condition(
        #         'linkedin_connect',
        #         {'user_id': user_id},
        #         "((status IS NOT NULL AND status != '') OR (type = 'line' AND (status IS NULL OR status = '')))",
        #         columns='websites'
        #     )
        #     if error:
        #         print(f"Error fetching existing URLs: {error}")
        #         return json.dumps({"result": 0})

        #     existing_urls_set = set(url['websites'] for url in existing_urls)
        #     deduplicated_urls = [url for url in set(new_urls) if url not in existing_urls_set]
        #     print(deduplicated_urls)

        #     # 3. insert the bulk data
        #     bulk_data = [{'user_id': user_id, 'websites': url, 'type': connect_type} for url in deduplicated_urls]
        #     rows_affected, error = dao.insert('linkedin_connect', bulk_data)
        #     if error:
        #         print(f"Error during insert: {error}")
        #     else:
        #         print(f"Successfully inserted {rows_affected} rows")
        #     return json.dumps({"result": 1})
        # except Exception as e:
        #     print(f"Error in handle_messages: {str(e)}")
        #     return json.dumps({"result": 0})

    if data['action'] == 'removeLine':
        user_linkedin_id = UserLinkedinAccountService(db).get_bind_account_id(data["account"], data["my_urn"])
        return LinkListService(db).remove_line(json.loads(data['data']),'line', user_linkedin_id)

        # try:
        #     # 1. fetch user_id condition
        #     account = data['account']
        #     my_urn = data['my_urn']
        #     delete_urls = json.loads(data['data'])
        #     connect_type = 'line'
        #     user_id = get_user_id(dao, account, my_urn)

        #     # 2. delete the bulk data
        #     conditions = {'user_id': user_id, 'type': connect_type}
        #     rows_affected, error = dao.bulk_delete('linkedin_connect', conditions, delete_urls, 'websites')
        #     if error:
        #         print(f"Error during delete: {error}")
        #         return json.dumps({"result": 0})
        #     else:
        #         print(f"Successfully deleted {rows_affected} rows")
        #         return json.dumps({"result": 1, "deleted": rows_affected})
        # except Exception as e:
        #     print(f"Error in handle_messages: {str(e)}")
        #     return json.dumps({"result": 0})

    # Section: 点击加人
    if data['action'] == 'getMesAddFriend':
        try:
            account = data['account']
            my_urn = data['my_urn']
            tag = data['tag']
            senior = data['other']

            # 1. fetch user_id condition
            user_id = get_user_id(dao, account, my_urn)

            conditions = {
                'user_id': user_id,
                'is_select': "1"
            }
            messages, error = dao.find('message', conditions, columns='mess')
            if error:
                return format_response(False, tag=tag)
            for message in messages:
                if senior == 'false':
                    message['mess'] = message['mess'][:200]
                else:
                    message['mess'] = message['mess'][:300]
            formatted_messages = [{"tidings": msg['mess']} for msg in messages]
            return format_response(True, formatted_messages, tag=tag)

        except Exception as e:
            print(f"Error in getMesAddFriend: {str(e)}")
            return format_response(False, tag=data.get('tag', ''))

    # Section: 邀请记录
    if data['action'] == 'saveConnectRecord':
        try:
            account = data['account']
            my_urn = data['my_urn']
            linkedin_id = data['data']
            tag = data['tag']
            status = data['other']
            # 1. fetch user_id condition
            user_id = get_user_id(dao, account, my_urn)

            # 2. judge the linkedin id/urn type
            if tag == 'line':
                update_data = {'status': status}
                conditions = {
                    'user_id': user_id,
                    'websites': linkedin_id,
                    # 'type': tag
                }
                success, error = dao.update('linkedin_connect', update_data, conditions)

            ##这里对待加列表做特殊处理，加完的人需要改变待加状态为已加
            elif tag == 'invite':
                user_linkedin_id = UserLinkedinAccountService(db).get_bind_account_id(account, my_urn)
                InviteListService(db).invite_from_queue(user_linkedin_id, linkedin_id)

            # elif tag == 'invite':
            #     update_data = {'status': status}
            #     conditions = {
            #         'user_id': user_id,
            #         'urn': linkedin_id,
            #         'type': tag
            #     }
            #     success, error = dao.update('linkedin_connect', update_data, conditions)

            # else:
            #     if linkedin_id.startswith("ACoAA"):
            #         insert_data = {
            #             'user_id': user_id,
            #             'urn': linkedin_id,
            #             'type': tag,
            #             'status': status,
            #         }
            #     else:
            #         insert_data = {
            #             'user_id': user_id,
            #             'websites': linkedin_id,
            #             'type': tag,
            #             'status': status,
            #         }
            #     success, error = dao.insert('linkedin_connect', insert_data)

            return json.dumps({"result": 1})
        except:
            return json.dumps({"result": 0})

    # Section：发送保存
    if data['action'] == 'saveUrl':
        account = data['account']
        my_urn = data['my_urn']
        print('saveUrl')
        return json.dumps({'result': 1})

    if data['action'] == 'saveRecallRecord':
        account = data['account']
        my_urn = data['my_urn']
        recall_num = data['my_urn']
        print('saveRecallRecord')
        return json.dumps({'result': 1})

    if data['action'] == 'addInviteQueue':
        user_linkedin_id = UserLinkedinAccountService(db).get_bind_account_id(data["account"], data["my_urn"])
        return InviteListService(db).add_invite_queue(data['data'], user_linkedin_id, data['tag'])

    if data['action'] == 'getInviteQueue':
        user_linkedin_id = UserLinkedinAccountService(db).get_bind_account_id(data["account"], data["my_urn"])
        pagination = {'page': data['data'], 'size': data['other']}
        return InviteListService(db).get_invite_queue(pagination, user_linkedin_id, data['tag'])

    if data['action'] == 'removeInvite':
        user_linkedin_id = UserLinkedinAccountService(db).get_bind_account_id(data["account"], data["my_urn"])
        return InviteListService(db).remove_invite_queue(data['data'], user_linkedin_id)

    # Section: 点赞功能
    if data['action'] == 'saveThumbsRecord':
        return Response(response=None,
                        status=200)

    # 群发模版
    if data['action'] == 'getTidings':
        try:
            # 1. fetch user_id condition
            account = data['account']
            my_urn = data['my_urn']
            senior = data['other']
            user_id = get_user_id(dao, account, my_urn)
            conditions = {'user_id': user_id}
            # 2. search results
            messages, error = dao.find('tidings', conditions, columns='create_time, tidings_title, tidings, is_select')
            # Convert 'id' to 'mess_id' and ensure it's a string
            if error:
                return format_response(False)
            for message in messages:
                message['tidings_id'] = str(message.pop('create_time'))
                if senior=='false':
                    message['tidings'] = message['tidings'][:200]
                else:
                    message['tidigs'] = message['tidings'][:300]
            return format_response(True, messages)
        except:
            return format_response(False)
    
    if data['action'] == 'saveTidings':
        try:
            account = data['account']
            my_urn = data['my_urn']
            create_time = data['data']
            tidings_content=data['other']
            tidings_title = data['tag']
            
            # 1. fetch user_id condition
            user_id = get_user_id(dao, account, my_urn)
            
            #save message
            conditions={'user_id':user_id, 'create_time':create_time}
            # update_data={'tidings_title':tidings_title, 'tidings':tidigs}
            tidings_id, error = dao.find('tidings', conditions, columns='id')
            if tidigs_id:
                update_data={'tidings_title':tidings_title, 'tidings':tidigs}
                conditions = {
                    'id': tidings_id[0]['id']
                }
                success, error = dao.update('tidings', update_data, conditions)
            else:
                # save message
                dao.insert('tidings',
                        {'user_id': user_id, 'tidings_title':tidings_title,'tidings': tidings_content, 'is_select': '1', 'create_time': create_time})

            return json.dumps({"result": 1})
        except:
            return json.dumps({"result": 0})
    
    if data['action'] == 'selectTidings':
        try:
            account = data['account']
            my_urn = data['my_urn']
            tidings_id = data['data']
            is_select = data['other']

            # 1. fetch user_id condition
            user_id = get_user_id(dao, account, my_urn)
            update_data = {'is_select': is_select}
            conditions = {
                'user_id': user_id,
                'create_time': tidings_id
            }
            print(conditions)

            success, error = dao.update('tidings', update_data, conditions)
            if error:
                print(f"Error in updateMessageIsSelect: {error}")
                return json.dumps({"result": 0, "tidings_id": "", "action": is_select})
            return json.dumps({"result": 1, "tidings_id": tidings_id, "action": is_select})
        except Exception as e:
            print(f"Error in updateMessageIsSelect: {str(e)}")
            return json.dumps({"result": 0, "tidings_id": "", "action": is_select})

    if data['action'] == 'selectAllTidings':
        try:
            account = data['account']
            my_urn = data['my_urn']
            is_select = data['data']
            total_tidings = data.get('other', None)

            # 1. fetch user_id condition
            user_id = get_user_id(dao, account, my_urn)

            update_data = {'is_select': is_select}
            conditions = {
                'user_id': user_id
            }
            success, error = dao.update('tidings', update_data, conditions)
            if error:
                print(f"Error in updateMessageIsSelect: {error}")
                return json.dumps({"result": 0, "action": is_select, "count": total_tidings})
            return json.dumps({"result": 1, "action": is_select, "count": total_tidings})
        except Exception as e:
            print(f"Error in updateMessageIsSelect: {str(e)}")
            return json.dumps({"result": 0, "action": is_select, "count": total_tidings})

    if data['action'] == 'deleteTidings':
        try:
            account = data['account']
            my_urn = data['my_urn']
            # 1. fetch user_id condition
            user_id = get_user_id(dao, account, my_urn)

            # delete message
            dao.delete('tidings', {'user_id': user_id, 'is_select': 1})

            return json.dumps({"result": 1})
        except:
            return json.dumps({"result": 0})
    
    #好友功能
    # if data['action']=='saveFriend':
    #     try:
    #         account = data['account']
    #         my_urn = data['my_urn']
    #         friends = data['data']
    #         friends_list = json.loads(friends)
    #         user_id = get_user_id(dao, account, my_urn)
    #         result_data=[]
    #         for friend in friends_list:
    #             urn = friend['urn']
    
    #             # Check if the urn exists in the database
    #             conditions = {'urn': urn}
    #             friend_urn, error = dao.find('myFriend', conditions, columns='urn')
    #             if friend_urn:
    #                  # Update the existing record
    #                 update_data = {
    #                     'first_name': friend['first_name'],
    #                     'last_name': friend['last_name'],
    #                     'img': friend['img'], 
    #                     'position': friend['position'],
    #                     'public_id': friend['public_id']
    #                 }
    #                 conditions = {'urn': urn}
    #                 success, error = dao.update('myFriend', update_data, conditions)
    #                 conditions_info = {'user_id':user_id, 'friend_urn':urn}
    #                 friend_data,error = dao.find('friends',conditions_info,columns='friend_urn, dig_state,is_prohibit, send_queue, send_time, remark, group_name ')
    #                 print('friend_data',friend_data)
    #                 result_data.append(friend_data[0])
    #             else:
    #                 # Insert a new record if not found
    #                 new_friend_data = {
    #                     'urn': urn,
    #                     'first_name': friend['first_name'],
    #                     'last_name': friend['last_name'],
    #                     'img': friend['img'], 
    #                     'position': friend['position'],
    #                     'public_id': friend['public_id']
    #                 }
    #                 my_frined_info_data = {
    #                     'user_id':user_id,
    #                     'friend_urn':urn,
    #                     'dig_state':0,
    #                     'is_prohibit':0,
    #                     'send_queue':0,
    #                     'remark':'',
    #                 }
    #                 dao.insert('myFriend', new_friend_data)
    #                 dao.insert('friends',my_frined_info_data)
    #                 my_frined_info_data_2= {
    #                     'friend_urn':urn,
    #                     'dig_state':0,
    #                     'is_prohibit':0,
    #                     'send_queue':0,
    #                     'send_time':NULL,
    #                     'remark':'',
    #                     'group_name':NULL
    #                 }
    #                 result_data.append(my_frined_info_data_2)
    #         print('data', result_data)
    #         return json.dumps({"result": 1, "data":result_data})
    #     except:
    #         return json.dumps({"result": 0})
    if data['action'] == 'saveFriend':
        try:
            account = data['account']
            my_urn = data['my_urn']
            friends = data['data']
            friends_list = json.loads(friends)
            user_id = get_user_id(dao, account, my_urn)
            result_data = []

            insert_myfriend_data = []
            update_myfriend_data = []
            insert_friends_data = []
            update_friends_data = []

            for friend in friends_list:
                urn = friend['urn']
                conditions = {'urn': urn}
                conditions_info = {'user_id': user_id, 'friend_urn': urn}
                friend_urn, error = dao.find('myFriend', conditions, columns='urn')
                friend_data, error = dao.find('friends', conditions_info, columns='friend_urn, dig_state, is_prohibit, send_queue, send_time, remark, group_name')

                if friend_urn:
                    # Prepare data for update
                    update_myfriend_data.append({
                        'urn': urn,
                        'first_name': friend['first_name'],
                        'last_name': friend['last_name'],
                        'img': friend['img'],
                        'position': friend['position'],
                        'public_id': friend['public_id']
                    })
                    # Get friends data and append to result_data
                    

                else:
                    # Prepare data for insert
                    insert_myfriend_data.append({
                        'urn': urn,
                        'first_name': friend['first_name'],
                        'last_name': friend['last_name'],
                        'img': friend['img'],
                        'position': friend['position'],
                        'public_id': friend['public_id'],
                        'is_prohibited': None
                    })
                
                if friend_data:
                    result_data.append(friend_data[0])
                else:
                    my_friend_info_data = {
                        'user_id': user_id,
                        'friend_urn': urn,
                        'dig_state': 0,
                        'is_prohibit': 0,
                        'send_time':None,
                        'send_queue': 0,
                        'remark': '',
                        'group_name':None
                    }
                    insert_friends_data.append(my_friend_info_data)
                    my_frined_info_data_2= {
                        'friend_urn':urn,
                        'dig_state':0,
                        'is_prohibit':0,
                        'send_queue':0,
                        'send_time':None,
                        'remark':'',
                        'group_name':None
                    }
                    result_data.append(my_frined_info_data_2)

           
            if insert_myfriend_data:
                dao.insert('myFriend', insert_myfriend_data)
            if insert_friends_data:
                dao.insert('friends', insert_friends_data)
            # if update_myfriend_data:
            #     dao.bulk_update('myFriend', update_myfriend_data, 'urn')

            print('data', result_data)
            return json.dumps({"result": 1, "data": result_data})

        except Exception as e:
            print(e)
            return json.dumps({"result": 0})

        
    
    
    
    


    



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)

    # staging
    # # Add Column
    # alter_query = """
    # ALTER TABLE linkedin_connect
    # ADD COLUMN urn VARCHAR(255) DEFAULT NULL;
    # """
    # result, error = dao.execute_alter_table(alter_query)

    # if error:
    #     print(f"Error adding urn column: {error}")
    # else:
    #     print("Successfully added urn column to message table")

    # # Drop Column
    # alter_query = "ALTER TABLE linkedin_connect DROP COLUMN urn;"
    # result, error = dao.execute_alter_table(alter_query)

    # if error:
    #     print(f"Error dropping urn column: {error}")
    # else:
    #     print("Successfully dropped urn column from message table")
