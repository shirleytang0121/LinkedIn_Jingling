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
            account = data['account']
            my_urn = data['my_urn']
            
            conditions = {'account': account, 'my_urn': my_urn}
            messages, error = dao.find('Message_Table', conditions, columns='mess_id, mess, is_select')
            
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

            update_data = {'is_select': is_select}
            conditions = {
                'account': account,
                'my_urn': my_urn,
                'mess_id': mess_id
            }

            success, error = dao.update('Message_Table', update_data, conditions)
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
            mess_id = data['data']
            is_select = data['other']

            update_data = {'is_select': is_select}
            conditions = {
                'account': account,
                'my_urn': my_urn,
                'mess_id': mess_id
            }
            success, error = dao.update('Message_Table', update_data, conditions)
            if error:
                print(f"Error in updateMessageIsSelect: {error}")
                return json.dumps({"result":0,"tidings_id":"","action":is_select})
            return json.dumps({"result":1,"tidings_id":mess_id,"action":is_select})
        except Exception as e:
            print(f"Error in updateMessageIsSelect: {str(e)}")
            return json.dumps({"result":0,"tidings_id":"","action":is_select})

    if data['action'] == 'getLine':
        try:
            account = data['account']
            my_urn = data['my_urn']
            page = int(data.get('data', 1))
            items_per_page = 100

            conditions = {
                'account': account,
                'my_urn': my_urn
            }
            
            # 使用 OR 条件来处理 NULL 和空字符串
            query = """
            SELECT COUNT(*) as total 
            FROM LinkedIn_Url_Table 
            WHERE account = %s AND my_urn = %s AND (status IS NULL OR status = '')
            """
            total, _ = dao.execute_query(query, (account, my_urn))
            total = total[0]['total'] if total else 0

            offset = (page - 1) * items_per_page
            query = """
            SELECT id, websites 
            FROM LinkedIn_Url_Table 
            WHERE account = %s AND my_urn = %s AND (status IS NULL OR status = '')
            LIMIT %s OFFSET %s
            """
            urls, _ = dao.execute_query(query, (account, my_urn, items_per_page, offset))
            
            return format_response(True, urls, total=total, count=items_per_page, page=page)
        except Exception as e:
            print(f"Error in handle_messages: {str(e)}")
            return format_response(False, error=str(e))

    if data['action'] == 'getMesAddFriend':
        try:
            account = data['account']
            my_urn = data['my_urn']
            tag = data['tag']
            is_select = data['other']

            conditions = {
                'account': account,
                'my_urn': my_urn,
                'is_select': is_select
            }
            messages, error = dao.find('Message_Table', conditions, columns='mess')
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

        update_data = {'status': status, 'tag': tag}
        conditions = {
            'account': account,
            'my_urn': my_urn,
            'websites': websites
        }
        success, error = dao.update('LinkedIn_Url_Table', update_data, conditions)
        return format_response(success)

    if data['action'] == 'saveUrl':
        account = data['account']
        my_urn = data['my_urn']
        print('saveUrl')
        return format_response(True, message="URL saved successfully")
    
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=False)