from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.BigInteger, primary_key=True)
    apn_user_id = db.Column(db.BigInteger, nullable=True)
    apn_email = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    login_code = db.Column(db.String(255), nullable=True)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)