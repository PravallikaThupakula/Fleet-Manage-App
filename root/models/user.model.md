Table Name: users

Columns:
- id (uuid, primary key)
- name (text, not null)
- email (text, unique)
- password (text)
- role (customer | owner | driver)
- created_at (timestamp)

Relationships:
- One user can be owner/driver/customer only
