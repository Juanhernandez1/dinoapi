CREATE DATABASE "denoland";

CREATE TABLE dinosaurios(
	id_dino SERIAL NOT NULL,
	PRIMARY KEY (id_dino),
	nombre VARCHAR(200) NOT NULL,
	altura VARCHAR(5) NOT NULL
);