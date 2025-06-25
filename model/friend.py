from extensions import db
from sqlalchemy import Index

class Friend(db.Model):
    __tablename__ = "friends"
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    user_id = db.Column(db.BigInteger, nullable=False, index=True)
    friend_urn = db.Column(db.String(255), nullable=False, index=True)
    dig_state = db.Column(db.BigInteger, nullable=False)
    is_prohibit = db.Column(db.BigInteger, nullable=False)
    send_queue = db.Column(db.String(255))
    send_time = db.Column(db.String(255))
    remark = db.Column(db.Text)
    group_id = db.Column(db.String(255))
    is_prohibit = db.Column(db.BigInteger, nullable=True)
    __table_args__ = (
        Index('idx_user_friend', user_id, friend_urn),
    )


