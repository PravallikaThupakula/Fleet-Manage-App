Table: trips

Fields:
- id (uuid, PK)
- customer_id (FK → users.id)
- vehicle_id (FK → vehicles.id)
- start_date (date)
- end_date (date)
- location (text)
- distance_km (numeric)
- passengers (int)
- tripCost (numeric)
- isCompleted (boolean)
- created_at (timestamp)
