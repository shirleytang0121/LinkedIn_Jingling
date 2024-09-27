import os
import urllib.parse



class Config:
    # 通过SQLAlchemy框架建立mysql的连接
    SQL_HOST = os.getenv('SQL_HOST', default='localhost')
    SQL_PORT = str(os.getenv('SQL_PORT', default=3307))
    SQL_USERNAME = os.getenv('SQL_USERNAME', default='root')
    SQL_PASSWORD = urllib.parse.quote(os.getenv('SQL_PASSWORD', default=''))
    SQL_DATABASE = os.getenv('SQL_DATABASE', default='lnkd-jingling')
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://' + SQL_USERNAME + ('@' if SQL_PASSWORD is '' else (':' + SQL_PASSWORD + '@')) + SQL_HOST + ':' + SQL_PORT + '/' \
                              + SQL_DATABASE
