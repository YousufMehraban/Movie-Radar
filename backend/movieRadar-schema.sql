CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL CHECK(position('@' IN email) > 1)
);

CREATE TABLE movie (
  id SERIAL PRIMARY KEY,
  movie_name TEXT NOT NULL,
  platform TEXT,
  poster TEXT,
  rating TEXT,
  release_year INTEGER,
  imdb_id TEXT,
);

CREATE TABLE watch_list (
  id SERIAL PRIMARY KEY,
  movie_id INTEGER NOT NULL REFERENCES movie ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE
);

CREATE TABLE recommendation (
  id SERIAL PRIMARY KEY,
  movie_id INTEGER NOT NULL REFERENCES movie ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE
);