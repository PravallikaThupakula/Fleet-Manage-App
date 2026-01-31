Table: vehicles

Fields:
- id (uuid, PK)
- name (text)
- registration_number (unique)
- allowed_passengers (int)
- isAvailable (boolean)
- driver_id (FK → users.id)
- rate_per_km (numeric)
- owner_id (FK → users.id)
- created_at (timestamp)

Relationships:
- One owner → many vehicles
- One driver → one vehicle
