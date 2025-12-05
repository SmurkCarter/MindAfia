# fix_migration_records.py
import sqlite3
import sys

DB = "db.sqlite3"  # change if your DB file is named differently
con = sqlite3.connect(DB)
cur = con.cursor()

print("Current django_migrations rows (ordered):")
for row in cur.execute("SELECT app, name FROM django_migrations ORDER BY app, name"):
    print(row)

# Remove admin rows so authentication can be applied first
print("\nDeleting admin rows from django_migrations...")
cur.execute("DELETE FROM django_migrations WHERE app = 'admin'")
con.commit()

print("Remaining rows after delete:")
for row in cur.execute("SELECT app, name FROM django_migrations ORDER BY app, name"):
    print(row)

con.close()
print("\nDone. Now run: .venv\\Scripts\\python.exe manage.py migrate authentication")

