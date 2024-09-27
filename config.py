import os
from dotenv import load_dotenv
import urllib.parse

load_dotenv()


class Config:
    DB_USER = os.getenv('DB_USER', 'root')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_NAME = os.getenv('DB_NAME', 'lnkd-jingling')
    DB_PORT = int(os.getenv('DB_PORT', 3307))

    @classmethod
    def get_db_config(cls):
        return {
            'user': cls.DB_USER,
            'password': cls.DB_PASSWORD,
            'host': cls.DB_HOST,
            'database': cls.DB_NAME,
            'port': cls.DB_PORT
        }
