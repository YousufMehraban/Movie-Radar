-- both test users have the password 'password'

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

INSERT INTO movies (movie_name, poster, rating, release_year, imdb_id)
VALUES ('Pathaan', 'https://m.media-amazon.com/images/M/MV5BM2QzM2JiNTMtYjU4Ny00MDZkLTk3MmUtYTRjMzVkZGJlNmYyXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg',
        '6.6/10', 2023, 'tt12844910'), ('Breaking Bad', 'https://m.media-amazon.com/images/M/MV5BYTU3NWI5OGMtZmZhNy00MjVmLTk1YzAtZjA3ZDA3NzcyNDUxXkEyXkFqcGdeQXVyODY5Njk4Njc@._V1_SX300.jpg',
        '9.5/10', 2008, 'tt0903747'), ('Afghanistan: The Wounded Land', 'https://m.media-amazon.com/images/M/MV5BNDIwYjE4YTYtYzdlMi00NTJmLWI4NGItZjRmNDk3YTc1MGUwXkEyXkFqcGdeQXVyMTcwNTc1Ng@@._V1_SX300.jpg',
        '8.4/10', 2020, 'tt12100420'), ('Tiger Zinda Hai', 'https://m.media-amazon.com/images/M/MV5BYzM0ZTg2OTEtNzI4My00NjBlLWFhYTctY2E4NzdiYzY1YWYwXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
        '5.9/10', 2017,'tt5956100'), ('The Jungle Book', 'https://m.media-amazon.com/images/M/MV5BMTc3NTUzNTI4MV5BMl5BanBnXkFtZTgwNjU0NjU5NzE@._V1_SX300.jpg',
        '7.4/10', 2016, 'tt3040964'), ('Friends with Benefits', 'https://m.media-amazon.com/images/M/MV5BMTQ2MzQ0NTk4N15BMl5BanBnXkFtZTcwMDc2NDYzNQ@@._V1_SX300.jpg',
        '6.5/10', 2011, 'tt1632708');

INSERT INTO recommendation (movie_id, user_id)
VALUES (1, 1),(2,1),(3,1),(4,2),(5,2),(6,2);

INSERT INTO watchlist (movie_id, user_id)
VALUES (1, 1),(2,1),(3,1),(4,2),(5,2),(6,2);

