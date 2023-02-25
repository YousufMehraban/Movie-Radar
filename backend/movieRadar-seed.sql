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

INSERT INTO watch_list (movie_name, platform, poster, actors, rating, release_year, user_id)
VALUES ('Pathaan', 'Netflix', 'https://m.media-amazon.com/images/M/MV5BM2QzM2JiNTMtYjU4Ny00MDZkLTk3MmUtYTRjMzVkZGJlNmYyXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg',
        'Shah Rukh Khan', '6.6/10', 2023, 1), ('Breaking Bad', 'Netflix', 'https://m.media-amazon.com/images/M/MV5BYTU3NWI5OGMtZmZhNy00MjVmLTk1YzAtZjA3ZDA3NzcyNDUxXkEyXkFqcGdeQXVyODY5Njk4Njc@._V1_SX300.jpg',
        'Bryan Cranston, Aaron Paul, Anna Gunn', '9.5/10', 2008, 1), ('Afghanistan: The Wounded Land', 'Netflix', 'https://m.media-amazon.com/images/M/MV5BNDIwYjE4YTYtYzdlMi00NTJmLWI4NGItZjRmNDk3YTc1MGUwXkEyXkFqcGdeQXVyMTcwNTc1Ng@@._V1_SX300.jpg',
        'Nadja Berlinghoff, Wenzel Banneyer, Sven Brieger', '8.4/10', 2020, 1), ('Tiger Zinda Hai', 'Netflix', 'https://m.media-amazon.com/images/M/MV5BYzM0ZTg2OTEtNzI4My00NjBlLWFhYTctY2E4NzdiYzY1YWYwXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
        'Salman Khan, Katrina Kaif, Kumud Mishra', '5.9/10', 2017, 2), ('The Jungle Book', 'Netflix', 'https://m.media-amazon.com/images/M/MV5BMTc3NTUzNTI4MV5BMl5BanBnXkFtZTgwNjU0NjU5NzE@._V1_SX300.jpg',
        'Neel Sethi, Bill Murray, Ben Kingsley', '7.4/10', 2016, 2), ('Friends with Benefits', 'Netflix', 'https://m.media-amazon.com/images/M/MV5BMTQ2MzQ0NTk4N15BMl5BanBnXkFtZTcwMDc2NDYzNQ@@._V1_SX300.jpg',
        'Mila Kunis, Justin Timberlake, Patricia Clarkson', '6.5/10', 2011, 2);

INSERT INTO recommendation (movie_name, platform, poster, actors, rating, release_year, user_id)
VALUES ('Pathaan', 'Netflix', 'https://m.media-amazon.com/images/M/MV5BM2QzM2JiNTMtYjU4Ny00MDZkLTk3MmUtYTRjMzVkZGJlNmYyXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg',
        'Shah Rukh Khan', '6.6/10', 2023, 1), ('Breaking Bad', 'Netflix', 'https://m.media-amazon.com/images/M/MV5BYTU3NWI5OGMtZmZhNy00MjVmLTk1YzAtZjA3ZDA3NzcyNDUxXkEyXkFqcGdeQXVyODY5Njk4Njc@._V1_SX300.jpg',
        'Bryan Cranston, Aaron Paul, Anna Gunn', '9.5/10', 2008, 1), ('Afghanistan: The Wounded Land', 'Netflix', 'https://m.media-amazon.com/images/M/MV5BNDIwYjE4YTYtYzdlMi00NTJmLWI4NGItZjRmNDk3YTc1MGUwXkEyXkFqcGdeQXVyMTcwNTc1Ng@@._V1_SX300.jpg',
        'Nadja Berlinghoff, Wenzel Banneyer, Sven Brieger', '8.4/10', 2020, 1), ('Tiger Zinda Hai', 'Netflix', 'https://m.media-amazon.com/images/M/MV5BYzM0ZTg2OTEtNzI4My00NjBlLWFhYTctY2E4NzdiYzY1YWYwXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
        'Salman Khan, Katrina Kaif, Kumud Mishra', '5.9/10', 2017, 2), ('The Jungle Book', 'Netflix', 'https://m.media-amazon.com/images/M/MV5BMTc3NTUzNTI4MV5BMl5BanBnXkFtZTgwNjU0NjU5NzE@._V1_SX300.jpg',
        'Neel Sethi, Bill Murray, Ben Kingsley', '7.4/10', 2016, 2), ('Friends with Benefits', 'Netflix', 'https://m.media-amazon.com/images/M/MV5BMTQ2MzQ0NTk4N15BMl5BanBnXkFtZTcwMDc2NDYzNQ@@._V1_SX300.jpg',
        'Mila Kunis, Justin Timberlake, Patricia Clarkson', '6.5/10', 2011, 2);
