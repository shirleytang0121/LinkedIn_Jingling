from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash


class InviteList(db.Model):
    __tablename__ = "to_invite_list"
    id = db.Column(db.BigInteger, primary_key=True)
    public_id = db.Column(db.String(255), nullable=False)
    state = db.Column(db.SmallInteger)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    position = db.Column(db.String(255))
    img = db.Column(db.String(2047))
    urn = db.Column(db.String(255), nullable=False)
    invite_time = db.Column(db.DateTime)
    user_linkedin_id = db.Column(db.BigInteger, nullable=False)
