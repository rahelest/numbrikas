CREATE TABLE person
(
  username VARCHAR(50) PRIMARY KEY,
  password VARCHAR(128) NOT NULL,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE game
(
  id INTEGER,
  owner VARCHAR(50) REFERENCES person(username),
  created TIMESTAMP,
  data TEXT
);

INSERT INTO person VALUES ('admin', 'a', 'Admin');
INSERT INTO person VALUES ('rahel', 'a', 'Rahel');