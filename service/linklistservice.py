from sqlalchemy import select, and_
from model.linklist import LinkList
import json
from flask import make_response, jsonify, Response
import datetime
import logging
from sqlalchemy.exc import SQLAlchemyError


def to_dto(linkedin_link):
    return {
        "user_id": linkedin_link.user_id,
        "websites": linkedin_link.websites
    }

def format_linkedin_links(linkedin_links, total, page):
    return json.dumps({
        "total": str(total), 
        "result": 1, 
        "data": list(map(to_dto, linkedin_links)),
        "count": 100, 
        "page": str(page)
    })


class LinkListService:

    def __init__(self, db):
        self.db = db

    def get_line(self, page, per_page, connect_type, user_linkedin_id):
        try:
            query = self.db.session.query(LinkList).filter(
                and_(
                    LinkList.user_id == user_linkedin_id, 
                    LinkList.status.is_(None))
                ).order_by(LinkList.id.desc())
            total = query.count()
            linkedin_links = query.limit(per_page).offset((page - 1) * per_page).all()
            return format_linkedin_links(linkedin_links, total, page)
        except SQLAlchemyError as e:
            logging.error(e)
            response_body = {
                "total": "0", 
                "result": 0, 
                "data": [], 
                "count": 100, 
                "page": str(page), 
                "error": str(e)}
            return json.dumps(response_body)
    
    def new_line(self, new_urls, connect_type, user_linkedin_id):
        try:
            urls = self.db.session.query(LinkList).with_entities(LinkList.websites).filter(LinkList.user_id == user_linkedin_id).all()
            existing_urls_set = set([url[0] for url in urls])
            #deduplicated_urls = [url for url in set(new_urls) if url not in existing_urls_set]
            # in order of what user input
            deduplicated_urls = []
            seen = set()
            for url in new_urls:
                if url not in seen and url not in existing_urls_set:
                    seen.add(url)
                    deduplicated_urls.append(url)
            new_records = [LinkList(
                user_id=user_linkedin_id,
                websites=url
            ) for url in reversed(deduplicated_urls)]
            self.db.session.bulk_save_objects(new_records)
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

    def remove_line(self, delete_urls, connect_type, user_linkedin_id):
        try:
            self.db.session.query(LinkList).filter(
                and_(
                    LinkList.user_id == user_linkedin_id,
                    LinkList.websites.in_(delete_urls)
                )
            ).delete()
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
        
