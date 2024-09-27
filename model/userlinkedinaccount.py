from extensions import db


class UserLinkedinAccount(db.Model):
    __tablename__ = "user_linkedin_account"
    id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.BigInteger, nullable=False)
    my_urn = db.Column(db.String(255), nullable=False)
    public_id = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    img = db.Column(db.String(2047))
    bind_time = db.Column(db.DateTime)
    unbind = db.Column(db.SmallInteger)
