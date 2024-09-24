from flask import Flask, request, Response
from flask_cors import CORS
from dao import DAO
from util import format_response
from config import Config
import json

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

db_config = Config.get_db_config()
dao = DAO(db_config)

@app.route('/api/messages', methods=['POST'])
def handle_messages():
    data = request.form

    if data['action'] == 'getMes':
        try:
            # 1. fetch user_id condition
            account = data['account']
            my_urn = data['my_urn']
            conditions = {'apn_user_id': account, 'linkedin_urn': my_urn}
            users, error = dao.find('user', conditions, columns='id')
            if error:
                return format_response(False)
            if not users:
                return format_response(False)
            user_id = users[0]['id']
            conditions = {'user_id': user_id}
            
            # 2. search results
            messages, error = dao.find('message', conditions, columns='id, mess, is_select')
            # Convert 'id' to 'mess_id' and ensure it's a string
            for message in messages:
                message['mess_id'] = str(message.pop('id'))
            
            if error:
                return format_response(False)
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
            conditions = {'apn_user_id': account, 'linkedin_urn': my_urn}
            users, error = dao.find('user', conditions, columns='id')
            if error:
                return format_response(False)
            if not users:
                return format_response(False)
            user_id = users[0]['id']
            update_data = {'is_select': is_select}
            conditions = {
                'user_id': user_id,
                'id': mess_id
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
            conditions = {'apn_user_id': account, 'linkedin_urn': my_urn}
            users, error = dao.find('user', conditions, columns='id')
            if error:
                return format_response(False)
            if not users:
                return format_response(False)
            user_id = users[0]['id']
            
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

    if data['action'] == 'getLine':
        try:
            # 1. fetch user_id condition
            account = data['account']
            my_urn = data['my_urn']
            conditions = {'apn_user_id': account, 'linkedin_urn': my_urn}
            users, error = dao.find('user', conditions, columns='id')
            if error:
                return format_response(False)
            if not users:
                return format_response(False)
            user_id = users[0]['id']
            
            page = int(data.get('data', 1))
            items_per_page = 100

            status_conditions = {'user_id': user_id, 'status': None}
            count_result = dao.count('linkedin_connect', status_conditions)
            total = count_result[0][0]['total'] if count_result else 0

            offset = (page - 1) * items_per_page
            query = """
            SELECT user_id, websites 
            FROM linkedin_connect 
            WHERE user_id = %s AND (status IS NULL OR status = '')
            LIMIT %s OFFSET %s
            """
            urls, _ = dao.execute_query(query, (user_id, items_per_page, offset))
            #print(json.dumps({"total": str(total), "result": 1, "data": urls, "count": 100, "page": str(page)}))
            return json.dumps({"total": str(total), "result": 1, "data": urls, "count": 100, "page": str(page)})
        except Exception as e:
            print(f"Error in handle_messages: {str(e)}")
            return json.dumps({"total": "0", "result": 0, "data": [], "count": 100, "page": str(page),"error": str(e)})

    if data['action'] == 'getMesAddFriend':
        try:
            account = data['account']
            my_urn = data['my_urn']
            tag = data['tag']
            is_select = data['other']
            
            # 1. fetch user_id condition
            conditions = {'apn_user_id': account, 'linkedin_urn': my_urn}
            users, error = dao.find('user', conditions, columns='id')
            if error:
                return format_response(False)
            if not users:
                return format_response(False)
            user_id = users[0]['id']
            
            conditions = {
                'user_id': user_id,
                'is_select': "1"
            }
            messages, error = dao.find('message', conditions, columns='mess')
            if error:
                return format_response(False, tag=tag)

            formatted_messages = [{"tidings": msg['mess']} for msg in messages]
            return format_response(True, formatted_messages, tag=tag)

        except Exception as e:
            print(f"Error in getMesAddFriend: {str(e)}")
            return format_response(False, tag=data.get('tag', ''))

    if data['action'] == 'saveConnectRecord':
        account = data['account']
        my_urn = data['my_urn']
        websites = data['data']
        tag = data['tag']
        status = data['other']
        
        # 1. fetch user_id condition
        conditions = {'apn_user_id': account, 'linkedin_urn': my_urn}
        users, error = dao.find('user', conditions, columns='id')
        if error:
            return format_response(False)
        if not users:
            return format_response(False)
        user_id = users[0]['id']
        
        update_data = {'status': status, 'type': tag}
        conditions = {
            'user_id': user_id,
            'websites': websites
        }
        success, error = dao.update('linkedin_connect', update_data, conditions)
        return format_response(success)

    if data['action'] == 'saveUrl':
        account = data['account']
        my_urn = data['my_urn']
        print('saveUrl')
        return format_response(True, message="URL saved successfully")
    
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=False)