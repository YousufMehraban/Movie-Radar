CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL CHECK(position('@' IN email) > 1)
);

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  movie_name TEXT NOT NULL,
  poster TEXT,
  rating TEXT,
  release_year INTEGER,
  imdb_id TEXT
);

CREATE TABLE recommendation (
  movie_id INTEGER NOT NULL REFERENCES movies ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE
);

CREATE TABLE watchlist (
  movie_id INTEGER NOT NULL REFERENCES movies ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE
);