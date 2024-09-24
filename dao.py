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
    
    def find_with_custom_condition(self, table, conditions, custom_condition, columns="*"):
        query = f"SELECT {columns} FROM {table} WHERE "
        query += " AND ".join([f"{key} = %s" for key in conditions.keys()])
        query += f" AND {custom_condition}"
        
        values = list(conditions.values())
        return self.execute_query(query, tuple(values))
    
    def insert(self, table, data):
        if not data:
            return 0, "No data provided"

        if isinstance(data, list):
            # Bulk insert
            if not all(isinstance(item, dict) for item in data):
                return 0, "All items must be dictionaries for bulk insert"
            
            columns = ", ".join(data[0].keys())
            placeholders = ", ".join(["%s"] * len(data[0]))
            placeholders = f"({placeholders})"
            placeholders = ", ".join([placeholders] * len(data))
            query = f"INSERT INTO {table} ({columns}) VALUES {placeholders}"
            
            values = [val for item in data for val in item.values()]
            return self.execute_query(query, values)
        
        elif isinstance(data, dict):
            # Single insert
            columns = ", ".join(data.keys())
            placeholders = ", ".join(["%s"] * len(data))
            query = f"INSERT INTO {table} ({columns}) VALUES ({placeholders})"
            return self.execute_query(query, tuple(data.values()))
        
        else:
            return 0, "Data must be a dictionary or a list of dictionaries"
   
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
    
    def bulk_delete(self, table, conditions, value_list, value_column):
        placeholders = ', '.join(['%s'] * len(value_list))
        where_clause = ' AND '.join([f"{key} = %s" for key in conditions.keys()])
        query = f"DELETE FROM {table} WHERE {where_clause} AND {value_column} IN ({placeholders})"
        
        values = list(conditions.values()) + value_list
        return self.execute_query(query, tuple(values))
    
    def count(self, table, conditions=None):
        query = f"SELECT COUNT(*) as total FROM {table}"
        if conditions:
            where_clauses = []
            values = []
            for key, value in conditions.items():
                if key == 'status' and (value is None or value == ''):
                    where_clauses.append("(status IS NULL OR status = '')")
                elif value is None:
                    where_clauses.append(f"{key} IS NULL")
                else:
                    where_clauses.append(f"{key} = %s")
                    values.append(value)
            if where_clauses:
                query += f" WHERE {' AND '.join(where_clauses)}"
            return self.execute_query(query, tuple(values))
        return self.execute_query(query)