from extensions import db

class InviteMessage(db.Model):
    __tablename__ = "message"
    id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.BigInteger, nullable=False)
    mess = db.Column(db.Text)
    is_select = db.Column(db.String(1), nullable=False)
    create_time = db.Column(db.String(255), nullable=False)

