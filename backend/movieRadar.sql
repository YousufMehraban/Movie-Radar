\echo 'Delete and recreate movie_radar db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE movie_radar;
CREATE DATABASE movie_radar;
\connect movie_radar

\i movieRadar-schema.sql
\i movieRadar-seed.sql

\echo 'Delete and recreate movie_radar_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE movie-radar_test;
CREATE DATABASE movie_radar_test;
\connect movie_radar_test

\i movieRadar-schema.sql
