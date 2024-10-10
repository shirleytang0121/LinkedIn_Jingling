from extensions import db

class LinkList(db.Model):
    __tablename__ = "linkedin_connect"
    id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.BigInteger, nullable=False)
    websites = db.Column(db.Text)
    status = db.Column(db.BigInteger, nullable=False)
    # type = db.Column(db.String(255), nullable=False)

