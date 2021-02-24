-- drop and delete table when migration script runs
DROP TABLE IF EXISTS parties;
DROP TABLE IF EXISTS candidates;
CREATE TABLE parties (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);
CREATE TABLE candidates (
  id INTEGER PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  industry_connected BOOLEAN NOT NULL,
  party_id INTEGER UNSIGNED,
  -- CONSTRAINT...flag the party_id field as an official foreign key and tell sQL which table and field it references. This ensures that no id can be inserted into the `candidates` table that doesn't also exist in the `parties` table.
  CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE
  SET NULL
);