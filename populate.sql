INSERT INTO pesquisador (nome, email, cpf, data_nascimento, status)
VALUES
('Mariana Duarte', 'marianaduarte@exemplo.com', '123.456.789-10', '1995-03-05', 'Inativo'),
('Rafael Almeida', 'rafael.almeida@exemplo.com', '987.654.321-00', '1988-08-22', 'Ativo'),
('Juliana Silva', 'juliana.silva@exemplo.com', '111.222.333-44', '1992-10-10', 'Ativo'),
('Carlos Mendes', 'carlos.mendes@exemplo.com', '555.666.777-88', '1985-01-18', 'Inativo'),
('Cleiton Santos', 'cleiton.santos@exemplo.com', '522.444.999-25', '1985-01-19', 'Ativo');


INSERT INTO telefone_pesquisador (id_pesquisador, telefone)
VALUES
(1, '91234-5678'),          -- Mariana
(2, '99876-5432'),          -- Rafael (Tel 1)
(2, '93456-7890'),          -- Rafael (Tel 2)
(3, '97777-1111'),          -- Juliana
(4, '98888-2222'),          -- Carlos (Tel 1)
(4, '90000-1111'),          -- Carlos (Tel 2)
(5, '98038-4444'),          -- Cleiton (Tel 1)
(5, '90000-1111'),          -- Cleiton (Tel 2)
(5, '1224-9090');           -- Cleiton (Tel 3)




-- Testando VIEW (mostra detalhes da coleta)
INSERT INTO frequencia (periodo) VALUES ('Semanal');

INSERT INTO bairro (nome, id_frequencia) VALUES ('Centro Histórico', 1);

INSERT INTO tipo_unidade_tratamento (tipo) VALUES ('Reciclagem');

INSERT INTO unidade_tratamento (nome, id_tipo_uni_tratamento, endereco, estado, cidade, rua) 
VALUES ('Usina Eco', 1, 'Rua das Flores, 100', 'SP', 'São Paulo', 'Rua das Flores');

INSERT INTO coleta (descricao, quantidade_kg, categoria, id_bairro, id_unidade_tratamento) 
VALUES ('Coleta de Plásticos', 150.50, 'Plástico', 1, 1);

INSERT INTO coleta (descricao, quantidade_kg, categoria, id_bairro, id_unidade_tratamento) 
VALUES ('Coleta de Vidros', 80.00, 'Vidro', 1, 1);

SELECT * FROM vw_detalhes_coleta;


-- Testando TRIGGER (impede cadastro de menores)
INSERT INTO pesquisador (nome, email, cpf, data_nascimento, status) 
VALUES ('Pesquisador Adulto', 'adulto@teste.com', '123.456.789-00', '2000-01-01', 'Ativo');

SELECT * FROM pesquisador WHERE email = 'adulto@teste.com';

INSERT INTO pesquisador (nome, email, cpf, data_nascimento, status) 
VALUES ('Jovem Aprendiz', 'jovem@teste.com', '999.888.777-66', CURRENT_DATE - INTERVAL '10 years', 'Ativo');


-- Testando PROCEDURE (desativa o status do pesquisador)
INSERT INTO pesquisador (nome, email, cpf, data_nascimento, status) 
VALUES ('Maria Alvo', 'maria@teste.com', '111.222.333-44', '1990-05-20', 'Ativo');

SELECT nome, cpf, status FROM pesquisador WHERE cpf = '111.222.333-44';

CALL sp_desativar_pesquisador('111.222.333-44');

SELECT nome, cpf, status FROM pesquisador WHERE cpf = '111.222.333-44';