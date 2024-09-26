import json
from typing import Optional
from dao import DAO  

def format_response(result, data=None, tag="", total=None, count=None, page=None, error=None):
    response = {
        "result": 1 if result else 0,
        "data": data if data is not None else [],
        "tag": tag
    }
    if total is not None:
        response["total"] = str(total)
    if count is not None:
        response["count"] = count
    if page is not None:
        response["page"] = str(page)
    if error is not None:
        response["error"] = error
    return json.dumps(response)

def get_user_id(dao: DAO, account: str, my_urn: str) -> Optional[int]:
    """
    Fetch user ID based on account and LinkedIn URN.
    
    :param dao: DAO instance
    :param account: User's account identifier
    :param my_urn: User's LinkedIn URN
    :return: User ID if found, None otherwise
    """
    conditions = {'apn_user_id': account, 'linkedin_urn': my_urn}
    result, error = dao.find('user_linkedin_account', conditions, columns='id')
    if error:
        print(f"Database error occurred: {error}")
        return None
    
    if not result:
        return None
    
    return result[0]['id']