CREATE TABLE users (
    id SERIAL PRIMARY KEY,
	name varchar(255),
	score INT
);

INSERT INTO Users(name, score) values ('player1', 10), ('player2', 20), ('player3', 15), ('player4', 5);