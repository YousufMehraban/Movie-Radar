

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
);

CREATE TABLE watch_list (
  id SERIAL PRIMARY KEY,
  movie_name TEXT NOT NULL,
  platform TEXT,
  poster TEXT,
  actors TEXT,
  rating TEXT,
  release_date DATETIME,
  user_id INTEGER NOT NULL
    REFERENCES users ON DELETE CASCADE
);

CREATE TABLE recommendation (
  id SERIAL PRIMARY KEY,
  movie_name TEXT NOT NULL,
  platform TEXT,
  poster TEXT,
  actors TEXT,
  rating TEXT,
  release_date DATETIME,
  user_id INTEGER NOT NULL
    REFERENCES users ON DELETE CASCADE
);
