import mysql.connector
from mysql.connector import Error

class DAO:
    def __init__(self, db_config):
        self.db_config = db_config

    def connect(self):
        try:
            conn = mysql.connector.connect(**self.db_config)
            if conn.is_connected():
                return conn
        except Error as e:
            print(f"Error: {e}")
            return None

    def execute_query(self, query, params=None):
        conn = self.connect()
        if not conn:
            return None, "Database connection failed"

        try:
            cursor = conn.cursor(dictionary=True)
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)

            if query.strip().upper().startswith("SELECT"):
                result = cursor.fetchall()
            else:
                conn.commit()
                result = cursor.rowcount

            return result, None
        except Error as e:
            return None, str(e)
        finally:
            if conn.is_connected():
                cursor.close()
                conn.close()

    def find(self, table, conditions, columns="*", limit=None, offset=None):
        query = f"SELECT {columns} FROM {table} WHERE "
        query += " AND ".join([f"{key} = %s" for key in conditions.keys()])
        
        if limit:
            query += f" LIMIT {limit}"
        if offset:
            query += f" OFFSET {offset}"

        return self.execute_query(query, tuple(conditions.values()))

    def insert(self, table, data):
        columns = ", ".join(data.keys())
        placeholders = ", ".join(["%s"] * len(data))
        query = f"INSERT INTO {table} ({columns}) VALUES ({placeholders})"
        return self.execute_query(query, tuple(data.values()))

    def update(self, table, data, conditions):
        set_clause = ", ".join([f"{key} = %s" for key in data.keys()])
        where_clause = " AND ".join([f"{key} = %s" for key in conditions.keys()])
        query = f"UPDATE {table} SET {set_clause} WHERE {where_clause}"
        params = tuple(list(data.values()) + list(conditions.values()))
        result, error = self.execute_query(query, params)
        if error:
            return False, error
        return result > 0, None

    def delete(self, table, conditions):
        where_clause = " AND ".join([f"{key} = %s" for key in conditions.keys()])
        query = f"DELETE FROM {table} WHERE {where_clause}"
        return self.execute_query(query, tuple(conditions.values()))

    def count(self, table, conditions=None):
        query = f"SELECT COUNT(*) as total FROM {table}"
        if conditions:
            where_clause = " AND ".join([f"{key} = %s" for key in conditions.keys()])
            query += f" WHERE {where_clause}"
            return self.execute_query(query, tuple(conditions.values()))
        return self.execute_query(query)