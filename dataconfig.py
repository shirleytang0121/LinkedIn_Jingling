import os
import urllib.parse



class Config:
    # 通过SQLAlchemy框架建立mysql的连接
    SQL_HOST = os.getenv('DB_HOST', default='localhost')
    SQL_PORT = str(os.getenv('DB_PORT', default=3307))
    SQL_USERNAME = os.getenv('DB_USER', default='root')
    SQL_PASSWORD = urllib.parse.quote(os.getenv('DB_PASSWORD', default=''))
    SQL_DATABASE = os.getenv('DB_NAME', default='lnkd-jingling')
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://' + SQL_USERNAME + ('@' if (SQL_PASSWORD == '' or SQL_PASSWORD is None) else (':' + SQL_PASSWORD + '@')) + SQL_HOST + ':' + SQL_PORT + '/' \
                              + SQL_DATABASE
