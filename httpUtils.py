import json


def format_response(result, data=None, tag="", total=None, count=None, page=None, error=None):
    response = {
        "result": result,
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