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