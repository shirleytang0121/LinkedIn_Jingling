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
    # Section: 邀请消息模板
    if data['action'] == 'getMes':
        try:
            print(data)
            # 1. fetch user_id condition
            account = data['account']
            my_urn = data['my_urn']
            senior = data['other']
            user_id = get_user_id(dao, account, my_urn)
            conditions = {'user_id': user_id}
            
            # 2. search results
            messages, error = dao.find('message', conditions, columns='create_time, mess, is_select')
            # Convert 'id' to 'mess_id' and ensure it's a string
            if error:
                return format_response(False)
            for message in messages:
                message['mess_id'] = str(message.pop('create_time'))
                if senior == 'false':
                    message['mess'] = message['mess'][:200]
                else:
                    message['mess'] = message['mess'][:300]
            print(messages)
            return format_response(True, messages)
        except:
            return format_response(False)

    if data['action'] == 'selectMes':
        try:
            account = data['account']
            my_urn = data['my_urn']
            mess_id = data['data']
            is_select = data['other']

            # 1. fetch user_id condition
            user_id = get_user_id(dao, account, my_urn)
            update_data = {'is_select': is_select}
            conditions = {
                'user_id': user_id,
                'create_time': mess_id
            }
            print(conditions)

            success, error = dao.update('message', update_data, conditions)
            if error:
                print(f"Error in updateMessageIsSelect: {error}")
                return json.dumps({"result":0,"tidings_id":"","action":is_select})
            return json.dumps({"result":1,"tidings_id":mess_id,"action":is_select})
        except Exception as e:
            print(f"Error in updateMessageIsSelect: {str(e)}")
            return json.dumps({"result":0,"tidings_id":"","action":is_select})

    if data['action'] == 'selectAllMes':
        try:
            account = data['account']
            my_urn = data['my_urn']
            is_select = data['data']
            total_message=data.get('other', None)

            # 1. fetch user_id condition
            user_id = get_user_id(dao, account, my_urn)

            update_data = {'is_select': is_select}
            conditions = {
                'user_id': user_id
            }
            success, error = dao.update('message', update_data, conditions)
            if error:
                print(f"Error in updateMessageIsSelect: {error}")
                return json.dumps({"result":0,"action":is_select,"count":total_message})
            return json.dumps({"result":1,"action":is_select,"count":total_message})
        except Exception as e:
            print(f"Error in updateMessageIsSelect: {str(e)}")
            return json.dumps({"result":0,"action":is_select,"count":total_message})

    if data['action'] == 'saveMes':  
        try:
            account = data['account']
            my_urn = data['my_urn']
            create_time = data['data']
            message_content=data['other']
            
            # 1. fetch user_id condition
            user_id = get_user_id(dao, account, my_urn)
            
            #save message
            dao.insert('message',{'user_id':user_id,'mess':message_content,'is_select':1,'create_time':create_time})
            
            return json.dumps({"result":1})
        except:
            return json.dumps({"result":0})
        
    if data['action'] == 'deleteMes':  
        try:
            account = data['account']
            my_urn = data['my_urn']
            # 1. fetch user_id condition
            user_id = get_user_id(dao, account, my_urn)
    
            #delete message
            dao.delete('message',{'user_id':user_id,'is_select':1})
            
            return json.dumps({"result":1})
        except:
            return json.dumps({"result":0})

    # Section: 链接加人
    if data['action'] == 'getLine':
        try:
            # 1. fetch user_id condition
            account = data['account']
            my_urn = data['my_urn']
            user_id = get_user_id(dao, account, my_urn)
            page = int(data.get('data', 1))
            items_per_page = 100
            connect_type = 'line'
            
            status_conditions = {'user_id': user_id, 'type' : connect_type, 'status': None}
            count_result = dao.count('linkedin_connect', status_conditions)
            total = count_result[0][0]['total'] if count_result else 0
            print(total)
            offset = (page - 1) * items_per_page
            query = """
            SELECT user_id, websites 
            FROM linkedin_connect 
            WHERE user_id = %s AND type = %s AND (status IS NULL OR status = '')
            LIMIT %s OFFSET %s
            """
            urls, _ = dao.execute_query(query, (user_id, connect_type, items_per_page, offset))
            print(urls)
            #print(json.dumps({"total": str(total), "result": 1, "data": urls, "count": 100, "page": str(page)}))
            return json.dumps({"total": str(total), "result": 1, "data": urls, "count": 100, "page": str(page)})
        except Exception as e:
            print(f"Error in handle_messages: {str(e)}")
            return json.dumps({"total": "0", "result": 0, "data": [], "count": 100, "page": str(page),"error": str(e)})

    if data['action'] == 'newLine':
        try:
            # 1. fetch user_id condition
            account = data['account']
            my_urn = data['my_urn']
            new_urls = json.loads(data['data'])
            connect_type = 'line'
            user_id = get_user_id(dao, account, my_urn)
            
            # 2. exclude the new_url in new_urls if exist in linkedin_connect
            existing_urls, error = dao.find_with_custom_condition(
                'linkedin_connect',
                {'user_id': user_id},
                "((status IS NOT NULL AND status != '') OR (type = 'line' AND (status IS NULL OR status = '')))",
                columns='websites'
            )
            if error:
                print(f"Error fetching existing URLs: {error}")
                return json.dumps({"result": 0})

            existing_urls_set = set(url['websites'] for url in existing_urls)
            deduplicated_urls = [url for url in new_urls if url not in existing_urls_set]
            print(deduplicated_urls)
            
            # 3. insert the bulk data
            bulk_data = [{'user_id': user_id, 'websites': url, 'type': connect_type} for url in deduplicated_urls]
            rows_affected, error = dao.insert('linkedin_connect', bulk_data)
            if error:
                print(f"Error during insert: {error}")
            else:
                print(f"Successfully inserted {rows_affected} rows")  
            return json.dumps({"result": 1})
        except Exception as e:
            print(f"Error in handle_messages: {str(e)}")
            return json.dumps({"result": 0})

    if data['action'] == 'removeLine':
        try:
            # 1. fetch user_id condition
            account = data['account']
            my_urn = data['my_urn']
            delete_urls = json.loads(data['data'])
            connect_type = 'line'
            user_id = get_user_id(dao, account, my_urn)

            # 2. delete the bulk data
            conditions = {'user_id': user_id, 'type': connect_type}
            rows_affected, error = dao.bulk_delete('linkedin_connect', conditions, delete_urls, 'websites')
            if error:
                print(f"Error during delete: {error}")
                return json.dumps({"result": 0})
            else:
                print(f"Successfully deleted {rows_affected} rows")  
                return json.dumps({"result": 1, "deleted": rows_affected})
        except Exception as e:
            print(f"Error in handle_messages: {str(e)}")
            return json.dumps({"result": 0})

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
                if senior=='false':
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
                    'type': tag
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

            return json.dumps({"result":1})
        except:
            return json.dumps({"result":0})

    # Section：发送保存
    if data['action'] == 'saveUrl':
        account = data['account']
        my_urn = data['my_urn']
        print('saveUrl')
        return json.dumps({'result':1})
    
    if data['action'] == 'saveRecallRecord':
        account = data['account']
        my_urn = data['my_urn']
        recall_num = data['my_urn']
        print('saveRecallRecord')
        return json.dumps({'result':1})

    if data['action'] == 'login':
        login_info = {"email": data['data'], "password": data['other']}
        response_body = UserService(db).login(login_info)
        # user = util.get_user_by_email(dao, email)
        # # response_body = None
        # if user is None:
        #     response_body = json.dumps({'result': 0})
        #     return response_body
        # hashed_password = user['password']
        # if util.check_password(password, hashed_password):
        #     response_body = json.dumps({'result': 2})
        #     return response_body
        # login_code = userservice.generate_random_string(6)
        # update_data = {'login_code': login_code}
        # conditions = {
        #     'user_id': user['id'],
        # }
        # dao.update('user', update_data)
        # response_body = json.dumps({
        #     'result': 1,
        #     'data': {
        #         'account': user['id'],
        #         'dia_time': '2099-12-30 23:59:59',
        #         'level': 3,
        #         'reg_time': '2099-12-30 23:59:59',
        #         'sup_time': '2099-12-30 23:59:59',
        #         'trial': 10,
        #         'vip_time': '2099-12-30 23:59:59',
        #     },
        #     'login_code': login_code
        # })
        return response_body

    if data['action'] == 'logout':
        user_id = UserLinkedinAccountService(db).get_user_id(data['my_urn'])
        UserService(db).logout(user_id, data['login_code'])

    if data['action'] == 'register':
        user = {'email': data['email'], 'password': data['password'], 'apn_user_id': data['apn_user_id']}
        return UserService(db).register(user)
        # if userservice.is_valid_email(email):
        #     dao.find()
        #     dao.insert('user',
        #                {'apn_user_id': apn_user_id, 'apn_email': email, 'password': util.hashed_password(password)})
        #
        #     return Response(response=json.dumps({
        #         "status": "success",
        #         "account": new_user['id'],
        #         "email": new_user['apn_email']}),
        #         status=201)
        # else:
        #     return Response(response=json.dumps({
        #         "status": "error",
        #         "user_id": "The email format is invalid!"}),
        #         status=400)
    if data['action'] == 'bindLinkedin':
        login_info = {'id': data['account'],'login_code': data['login_code'] }
        login_res = UserService(db).check_login_code(login_info)
        if login_res:
            return login_res
        linkedin_account = {'data': data['data'], 'user_id': data['account']}
        return UserLinkedinAccountService(db).bind_account(linkedin_account)

    if data['action'] == 'getBind':
        login_info = {'id': data['account'], 'login_code': data['login_code']}
        login_res = UserService(db).check_login_code(login_info)
        if login_res:
            return login_res
        return UserLinkedinAccountService(db).get_bind_accounts(data['account'])

    if data['action'] == 'addInviteQueue':
        login_info = {'id': data['account'], 'login_code': data['login_code']}
        login_res = UserService(db).check_login_code(login_info)
        if login_res:
            return login_res
        if check_urn(data['my_urn']):
            return check_urn(data['my_urn'])
        user_linkedin_id = UserLinkedinAccountService(db).get_bind_account_id(data["account"], data["my_urn"])
        return InviteListService(db).add_invite_queue(data['data'], user_linkedin_id, data['tag'])

    if data['action'] == 'getInviteQueue':
        login_info = {'id': data['account'], 'login_code': data['login_code']}
        login_res = UserService(db).check_login_code(login_info)
        if login_res:
            return login_res
        if check_urn(data['my_urn']):
            return check_urn(data['my_urn'])
        user_linkedin_id = UserLinkedinAccountService(db).get_bind_account_id(data["account"], data["my_urn"])
        pagination = {'page': data['data'], 'size': data['other']}
        print(InviteListService(db).get_invite_queue(pagination, user_linkedin_id, data['tag']))
        print(json.dumps({"total":6,"result":1,"data":[{"urn":"ACoAACZl5EcBfWzVeWpdhthEGJZRCGlmDeBJyN8","public_id":"mitchell-rice-8b38b315b","first_name":"Mitchell","last_name":"Rice","position":"Principal - Elkstone Capital | GP | MF, Self-Storage, Hotel to MF | Fund Manager - Cargo Capital | REFM 1,2,3 | $15M equity raised YTD","img":"https:\/\/media.licdn.com\/dms\/image\/v2\/D5603AQH_-O2B2x0rsw\/profile-displayphoto-shrink_100_100\/profile-displayphoto-shrink_100_100\/0\/1725388402190?e=1732752000&v=beta&t=btvqO80ktna65BGJ_X6SMRoxy3U7-5NyYm16qgfCxu4","invite_time":None,"state":"2"},{"urn":"ACoAAC7qE8QBp-TEjAVI7DzxmLC2gLtX1jTf_fM","public_id":"bryanvanderlyn","first_name":"Bryan","last_name":"Vanderlyn","position":"A-123 Senior Consultant","img":"https:\/\/media.licdn.com\/dms\/image\/v2\/D4E03AQFrMZ9tTQgG1w\/profile-displayphoto-shrink_100_100\/profile-displayphoto-shrink_100_100\/0\/1718242951614?e=1732752000&v=beta&t=SPQFhFJj6JJZo5KwZtZcBjlj-OTwlTvRha5X8FJJ2CM","invite_time":None,"state":"2"},{"urn":"ACoAACUPaBkB4qNzmzPIYWQGXXinEEumWZ_xofY","public_id":"tian-yang","first_name":"Tian","last_name":"Yang","position":"Applied Business Analyst","img":"https:\/\/media.licdn.com\/dms\/image\/v2\/C5603AQGAxIBnAP_gVQ\/profile-displayphoto-shrink_100_100\/profile-displayphoto-shrink_100_100\/0\/1630646060215?e=1732752000&v=beta&t=AAy8m1kKR03RZqmsnf0zHggUC36XBmHhugLHNRW6Vac","invite_time":None,"state":"2"},{"urn":"ACoAABXe2oUBm6OuhTMIe3dk1YIiulvDVGfX5c0","public_id":"chonghaohuang","first_name":"Chonghao","last_name":"Huang","position":"Investor","img":"https:\/\/media.licdn.com\/dms\/image\/v2\/C5603AQGyau5SkyeCtQ\/profile-displayphoto-shrink_100_100\/profile-displayphoto-shrink_100_100\/0\/1645213062847?e=1732752000&v=beta&t=HmyCh3cz7tQwSi9cZkw2qQ8W5GmFdczu8AEb7sQHfdU","invite_time":None,"state":"2"},{"urn":"ACoAACGb75wBi5ch2g-jbp-40dEKSawvpFnWMp4","public_id":"vasundhararakesh","first_name":"Vasundhara","last_name":"Rakesh","position":"MBA at Stanford GSB | Cartesia | Bain & Company","img":"https:\/\/media.licdn.com\/dms\/image\/v2\/D5603AQGyizhx82QdlQ\/profile-displayphoto-shrink_100_100\/profile-displayphoto-shrink_100_100\/0\/1707248629162?e=1732752000&v=beta&t=cZH0AwCcm7kguDbBM72i-zhhv15vHoDvTKV_eXo36dU","invite_time":None,"state":"2"},{"urn":"ACoAADEahRoBmbi-KK56_5hXxwJZHA3MoM3R7vA","public_id":"matthew-plisko-736a901ab","first_name":"Matthew","last_name":"Plisko","position":"AVP - Quantitative Research and Trading Recruitment Consultant at Selby Jennings","img":"https:\/\/media.licdn.com\/dms\/image\/v2\/D4E03AQEPGCj3sjivMA\/profile-displayphoto-shrink_100_100\/profile-displayphoto-shrink_100_100\/0\/1704288858888?e=1732752000&v=beta&t=hd0X8ujxYu5TQs3HDZL6O-yi_BdM2jOwZ2wTsqSBVUQ","invite_time":None,"state":"2"}],"page":"1","count":"100"}))
        return InviteListService(db).get_invite_queue(pagination, user_linkedin_id, data['tag'])
        # return json.dumps({"total":6,"result":1,"data":[{"urn":"ACoAACZl5EcBfWzVeWpdhthEGJZRCGlmDeBJyN8","public_id":"mitchell-rice-8b38b315b","first_name":"Mitchell","last_name":"Rice","position":"Principal - Elkstone Capital | GP | MF, Self-Storage, Hotel to MF | Fund Manager - Cargo Capital | REFM 1,2,3 | $15M equity raised YTD","img":"https:\/\/media.licdn.com\/dms\/image\/v2\/D5603AQH_-O2B2x0rsw\/profile-displayphoto-shrink_100_100\/profile-displayphoto-shrink_100_100\/0\/1725388402190?e=1732752000&v=beta&t=btvqO80ktna65BGJ_X6SMRoxy3U7-5NyYm16qgfCxu4","invite_time":None,"state":"2"},{"urn":"ACoAAC7qE8QBp-TEjAVI7DzxmLC2gLtX1jTf_fM","public_id":"bryanvanderlyn","first_name":"Bryan","last_name":"Vanderlyn","position":"A-123 Senior Consultant","img":"https:\/\/media.licdn.com\/dms\/image\/v2\/D4E03AQFrMZ9tTQgG1w\/profile-displayphoto-shrink_100_100\/profile-displayphoto-shrink_100_100\/0\/1718242951614?e=1732752000&v=beta&t=SPQFhFJj6JJZo5KwZtZcBjlj-OTwlTvRha5X8FJJ2CM","invite_time":None,"state":"2"},{"urn":"ACoAACUPaBkB4qNzmzPIYWQGXXinEEumWZ_xofY","public_id":"tian-yang","first_name":"Tian","last_name":"Yang","position":"Applied Business Analyst","img":"https:\/\/media.licdn.com\/dms\/image\/v2\/C5603AQGAxIBnAP_gVQ\/profile-displayphoto-shrink_100_100\/profile-displayphoto-shrink_100_100\/0\/1630646060215?e=1732752000&v=beta&t=AAy8m1kKR03RZqmsnf0zHggUC36XBmHhugLHNRW6Vac","invite_time":None,"state":"2"},{"urn":"ACoAABXe2oUBm6OuhTMIe3dk1YIiulvDVGfX5c0","public_id":"chonghaohuang","first_name":"Chonghao","last_name":"Huang","position":"Investor","img":"https:\/\/media.licdn.com\/dms\/image\/v2\/C5603AQGyau5SkyeCtQ\/profile-displayphoto-shrink_100_100\/profile-displayphoto-shrink_100_100\/0\/1645213062847?e=1732752000&v=beta&t=HmyCh3cz7tQwSi9cZkw2qQ8W5GmFdczu8AEb7sQHfdU","invite_time":None,"state":"2"},{"urn":"ACoAACGb75wBi5ch2g-jbp-40dEKSawvpFnWMp4","public_id":"vasundhararakesh","first_name":"Vasundhara","last_name":"Rakesh","position":"MBA at Stanford GSB | Cartesia | Bain & Company","img":"https:\/\/media.licdn.com\/dms\/image\/v2\/D5603AQGyizhx82QdlQ\/profile-displayphoto-shrink_100_100\/profile-displayphoto-shrink_100_100\/0\/1707248629162?e=1732752000&v=beta&t=cZH0AwCcm7kguDbBM72i-zhhv15vHoDvTKV_eXo36dU","invite_time":None,"state":"2"},{"urn":"ACoAADEahRoBmbi-KK56_5hXxwJZHA3MoM3R7vA","public_id":"matthew-plisko-736a901ab","first_name":"Matthew","last_name":"Plisko","position":"AVP - Quantitative Research and Trading Recruitment Consultant at Selby Jennings","img":"https:\/\/media.licdn.com\/dms\/image\/v2\/D4E03AQEPGCj3sjivMA\/profile-displayphoto-shrink_100_100\/profile-displayphoto-shrink_100_100\/0\/1704288858888?e=1732752000&v=beta&t=hd0X8ujxYu5TQs3HDZL6O-yi_BdM2jOwZ2wTsqSBVUQ","invite_time":None,"state":"2"}],"page":"1","count":"100"})
    
    if data['action'] == 'removeInvite':
        login_info = {'id': data['account'], 'login_code': data['login_code']}
        login_res = UserService(db).check_login_code(login_info)
        if login_res:
            return login_res
        if check_urn(data['my_urn']):
            return check_urn(data['my_urn'])
        user_linkedin_id = UserLinkedinAccountService(db).get_bind_account_id(data["account"], data["my_urn"])
        return InviteListService(db).remove_invite_queue(data['data'], user_linkedin_id)







if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)

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