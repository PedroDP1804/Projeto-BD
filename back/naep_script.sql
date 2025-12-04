CREATE DATABASE naep;

CREATE TABLE pesquisador (
	id SERIAL PRIMARY KEY NOT NULL,
	nome VARCHAR(100),
	foto BYTEA,
	email VARCHAR(50),
	cpf CHAR(14),
	data_nascimento DATE,
	status VARCHAR(10)
)

CREATE TABLE telefone_pesquisador (
	id_pesquisador INT NOT NULL,
	telefone VARCHAR(20),
	PRIMARY KEY (id_pesquisador, telefone),
	FOREIGN KEY (id_pesquisador) REFERENCES pesquisador(id)
		ON DELETE CASCADE
);

CREATE TABLE status_pesquisa (
	id_status_pesquisa SERIAL PRIMARY KEY,
	status VARCHAR(20)
);

CREATE TABLE frequencia (
	id SERIAL PRIMARY KEY,
	periodo VARCHAR(20)
);

CREATE TABLE bairro (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(20),
	id_frequencia INT NOT NULL,
	FOREIGN KEY (id_frequencia) REFERENCES frequencia(id)
);

CREATE TABLE equipe (
	id SERIAL PRIMARY KEY NOT NULL,
	nome VARCHAR(50),
	id_pesquisador INT NOT NULL,
	FOREIGN KEY (id_pesquisador) REFERENCES pesquisador(id)
		ON DELETE CASCADE
);

CREATE TABLE pesquisa (
	id_pesquisa SERIAL PRIMARY KEY NOT NULL,
	descricao VARCHAR(50),
	data_inicio VARCHAR(50),
	data_fim VARCHAR(50),
	id_frequencia INT NOT NULL,
	id_status_pesquisa INT NOT NULL,
	id_equipe INT NOT NULL,
	FOREIGN KEY (id_frequencia) REFERENCES frequencia(id),
	FOREIGN KEY (id_status_pesquisa) REFERENCES status_pesquisa(id_status_pesquisa)
	FOREIGN KEY (id_equipe) REFERENCES equipe(id_equipe)
);

CREATE TABLE tipo_unidade_tratamento (
	id_tipo_uni_tratamento SERIAl PRIMARY KEY,
	tipo VARCHAR(20)
);

CREATE TABLE unidade_tratamento (
	id_unidade_tratamento SERIAL PRIMARY KEY,
	nome VARCHAR(50),
	id_tipo_uni_tratamento INT NOT NULL,

	endereco VARCHAR(50),
    estado VARCHAR(50),
    cidade VARCHAR(50),
    rua VARCHAR(50),
	FOREIGN KEY (id_tipo_uni_tratamento) REFERENCES tipo_unidade_tratamento(id_tipo_uni_tratamento)
);

CREATE TABLE coleta (
	id_coleta SERIAL PRIMARY KEY,
	descricao VARCHAR(100),
	quantidade_kg FLOAT,
	categoria VARCHAR(20),
	id_bairro INT NOT NULL,
	id_unidade_tratamento INT NOT NULL,
	FOREIGN KEY (id_unidade_tratamento) REFERENCES unidade_tratamento(id_unidade_tratamento),
	FOREIGN KEY (id_bairro) REFERENCES bairro(id)
);