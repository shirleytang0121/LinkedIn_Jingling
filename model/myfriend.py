from extensions import db

class MyFriend(db.Model):
    __tablename__ = "myFriend"
    urn = db.Column(db.String(255), primary_key=True, index=True)
    public_id = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    img = db.Column(db.String(255), nullable=False)
    position = db.Column(db.String(255), nullable=False)
    
    


