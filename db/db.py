import sqlite3

DB_FILE = "library.db"
INIT_SCRIPT = "init.sql"
SAMPLE_DATA = "sample_data.sql"

def run_sql_script(cursor, script_file):
    print(f"Running {script_file}...")
    with open(script_file, "r") as file:
        sql_script = file.read()
    cursor.executescript(sql_script)

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='BOOK';")
    table_exists = cursor.fetchone()

    if not table_exists:
        print("DB schema not found. Initializing database...")
        run_sql_script(cursor, INIT_SCRIPT)
        run_sql_script(cursor, SAMPLE_DATA)
        conn.commit()
        print("DB successfully initialized.")
    else:
        print("DB already initialized.")
    
    conn.close()

if __name__ == "__main__":
    init_db()