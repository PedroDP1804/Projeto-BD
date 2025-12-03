-- 1. Limpa as tabelas antes de inserir para evitar duplicidade (O CASCADE limpa os filhos também)
TRUNCATE TABLE telefone_pesquisador, pesquisador, bairro, frequencia, equipe RESTART IDENTITY CASCADE;

-- 2. Inserir Pesquisadores (FORÇANDO O ID para garantir que seja 1, 2, 3...)
INSERT INTO pesquisador (id, nome, email, cpf, data_nascimento, status)
VALUES
(1, 'Mariana Duarte', 'marianaduarte@exemplo.com', '123.456.789-10', '1995-03-05', 'Inativo'),
(2, 'Rafael Almeida', 'rafael.almeida@exemplo.com', '987.654.321-00', '1988-08-22', 'Ativo'),
(3, 'Juliana Silva', 'juliana.silva@exemplo.com', '111.222.333-44', '1992-10-10', 'Ativo'),
(4, 'Carlos Mendes', 'carlos.mendes@exemplo.com', '555.666.777-88', '1985-01-18', 'Inativo'),
(5, 'Cleiton Santos', 'cleiton.santos@exemplo.com', '522.444.999-25', '1985-01-19', 'Ativo');

-- 3. Inserir Telefones (Agora vai funcionar, pois garantimos que o ID 1 existe acima)
INSERT INTO telefone_pesquisador (id_pesquisador, telefone)
VALUES
(1, '91234-5678'),
(2, '99876-5432'),
(2, '93456-7890'),
(3, '97777-1111'),
(4, '98888-2222'),
(4, '90000-1111'),
(5, '98038-4444'),
(5, '90000-1111'),
(5, '1224-9090');

-- 4. Inserir Frequências (Forçando ID)
INSERT INTO frequencia (id, periodo) VALUES
(1, 'Diaria'),
(2, 'Semanal'),
(3, 'Quinzenal'),
(4, 'Mensal'),
(5, 'Semestral'),
(6, 'Anual');

-- 5. Inserir Bairros
INSERT INTO bairro (nome, id_frequencia) VALUES
('Itapoa I', 1),
('Itapoa II', 2),
('Itapoa III', 5),
('Del Lago', 4),
('Paranoa Park', 3);

-- 6. Insere as Equipes com os IDs de pesquisadores mapeados corretamente
INSERT INTO equipe (id, nome, id_pesquisador) VALUES
(1, 'Equipe Cerrado', 2),      -- Rafael (Index 1)
(2, 'Equipe Savana', 4),       -- Carlos (Index 3)
(3, 'Equipe Linkin Park', 3),  -- Juliana (Index 2)
(4, 'Equipe Campo Limpo', 1),  -- Mariana (Index 0)
(5, 'Equipe Lírios', 5);       -- Cleiton (Index 4)

-- LAST. Ajustar os contadores (Sequences)
-- Como forçamos os IDs, precisamos dizer ao banco onde parar para ele não tentar criar o ID 1 de novo na próxima chamada da API.
SELECT setval('pesquisador_id_seq', (SELECT MAX(id) FROM pesquisador));
SELECT setval('frequencia_id_seq', (SELECT MAX(id) FROM frequencia));
SELECT setval('bairro_id_seq', (SELECT MAX(id) FROM bairro));
SELECT setval('equipe_id_seq', (SELECT MAX(id) FROM equipe));