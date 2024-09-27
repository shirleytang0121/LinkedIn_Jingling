import json
from typing import Optional
from dao import DAO
import bcrypt


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
    conditions = {'apn_user_id': account}
    result, error = dao.find('user', conditions, columns='id')
    conditions2 = {'user_id':result[0]['id'], 'linkedin_urn': my_urn}
    result, error = dao.find('user_linkedin_account', conditions2, columns='id')
    
    if error:
        print(f"Database error occurred: {error}")
        return None
    
    if not result:
        return None
    
    return result[0]['id']


def get_user_by_email(dao: DAO, email: str):
    conditions = {'apn_email': email}
    results, error = dao.find('user', conditions)
    if results is None or len(results) <= 0:
        return None
    return results[0]


def check_register(dao: DAO, email: str):
    conditions = {'apn_email': email}
    results, error = dao.find('user', conditions)
    if results is not None and len(results) > 0:
        return False
    return True


def hashed_password(password):
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    return hashed


def check_password(password, hashed_password):
    return bcrypt.checkpw(password, hashed_password)

