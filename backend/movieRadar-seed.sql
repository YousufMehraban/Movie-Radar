-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com'),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com');

INSERT INTO watch_list (movie_name,
                       platform,
                       poster,
                       actors,
                       rating,
                       release_date,
                       user_id);
VALUES ('Pathaan', 'amazon prime', "https://m.media-amazon.com/images/M/MV5BM2QzM2JiNTMtYjU4Ny00MDZkLTk3MmUtYTRjMzVkZGJlNmYyXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg",
        'Shah Rukh Khan', '6.6/10', 2023-01-25, 1),
       ('Breaking Bad', 'Netflix', "https://m.media-amazon.com/images/M/MV5BYTU3NWI5OGMtZmZhNy00MjVmLTk1YzAtZjA3ZDA3NzcyNDUxXkEyXkFqcGdeQXVyODY5Njk4Njc@._V1_SX300.jpg",
        '"Bryan Cranston, Aaron Paul, Anna Gunn"',
        '9.5/10', 2008-01-20, 2);

INSERT INTO recommendation (movie_name, 
                        platform,
                        actors, 
                        poster, 
                        rating, 
                        release_date, 
                        user_id);
VALUES ('Pathaan', 'amazon prime', "https://m.media-amazon.com/images/M/MV5BM2QzM2JiNTMtYjU4Ny00MDZkLTk3MmUtYTRjMzVkZGJlNmYyXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg",
        'Shah Rukh Khan', '6.6/10', 2023-01-25, 1),
       ('Breaking Bad', 'Netflix', "https://m.media-amazon.com/images/M/MV5BYTU3NWI5OGMtZmZhNy00MjVmLTk1YzAtZjA3ZDA3NzcyNDUxXkEyXkFqcGdeQXVyODY5Njk4Njc@._V1_SX300.jpg",
        '"Bryan Cranston, Aaron Paul, Anna Gunn"',
        '9.5/10', 2008-01-20, 2);
