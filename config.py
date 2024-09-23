import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DB_USER = os.getenv('DB_USER')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_HOST = os.getenv('DB_HOST')
    DB_NAME = os.getenv('DB_NAME')
    DB_PORT = int(os.getenv('DB_PORT', 3306))

    @classmethod
    def get_db_config(cls):
        return {
            'user': cls.DB_USER,
            'password': cls.DB_PASSWORD,
            'host': cls.DB_HOST,
            'database': cls.DB_NAME,
            'port': cls.DB_PORT
        }