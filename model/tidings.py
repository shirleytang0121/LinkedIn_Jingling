from extensions import db
from sqlalchemy import Index

class Tidings(db.Model):
    __tablename__ = "tidings"
    id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.BigInteger, nullable=False)
    tidings_title = db.Column(db.String(255))
    tidings = db.Column(db.Text,nullable=False)
    is_select = db.Column(db.String(1))
    create_time = db.Column(db.String(255))

    def __init__(self, user_id, tidings_title, tidings, is_select, create_time):
        self.user_id = user_id
        self.tidings_title = tidings_title
        self.tidings = tidings
        self.is_select = is_select
        self.create_time = create_time

   