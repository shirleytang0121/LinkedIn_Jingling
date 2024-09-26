from flask import Flask, request, Response
from flask_cors import CORS
from dao import DAO
from util import format_response, get_user_id
from config import Config
import json

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

db_config = Config.get_db_config()
dao = DAO(db_config)

@app.route('/api/messages', methods=['POST'])
def handle_messages():
    data = request.form

    # Section: 邀请消息模板
    if data['action'] == 'getMes':
        try:
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
                if senior=='false':
                    message['mess'] = message['mess'][:200]
                else:
                    message['mess'] = message['mess'][:300]
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
    
    # Section: 批量点赞
    if data['action'] == 'saveThumbsRecord':
        return Response(status=200)
    
    
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=False)
    
    
    
    
    
    
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