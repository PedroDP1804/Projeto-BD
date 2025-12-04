create database naep;

create table pesquisador (
	id SERIAL primary key not null,
	nome VARCHAR(100),
	foto BYTEA,
	email VARCHAR(50),
	cpf CHAR(14),
	data_nascimento DATE,
	status VARCHAR(10)
);

create table telefone_pesquisador (
	id_pesquisador INT not null,
	telefone VARCHAR(20),
	primary key (id_pesquisador,
telefone),
	foreign key (id_pesquisador) references pesquisador(id)
		on
delete
	cascade
);

create table status_pesquisa (
	id_status_pesquisa SERIAL primary key,
	status VARCHAR(20)
);

create table frequencia (
	id SERIAL primary key,
	periodo VARCHAR(20)
);

create table bairro (
	id SERIAL primary key,
	nome VARCHAR(20),
	id_frequencia INT not null,
	foreign key (id_frequencia) references frequencia(id)
);

create table equipe (
	id SERIAL primary key not null,
	nome VARCHAR(50),
	id_pesquisador INT not null,
	foreign key (id_pesquisador) references pesquisador(id)
		on
delete
	cascade
);

create table pesquisa (
	id_pesquisa SERIAL primary key not null,
	descricao VARCHAR(50),
	data_inicio VARCHAR(50),
	data_fim VARCHAR(50),
	id_frequencia INT not null,
	id_status_pesquisa INT not null,
	id_equipe INT not null,
	foreign key (id_frequencia) references frequencia(id),
	foreign key (id_status_pesquisa) references status_pesquisa(id_status_pesquisa),
	foreign key (id_equipe) references equipe(id)
);

create table tipo_unidade_tratamento (
	id SERIAl primary key,
	tipo VARCHAR(20)
);

create table unidade_tratamento (
	id SERIAL primary key,
	nome VARCHAR(50),
	id_tipo_unidade INT not null,

	endereco VARCHAR(50),
    estado VARCHAR(50),
    cidade VARCHAR(50),
    rua VARCHAR(50),
	
	foreign key (id_tipo_unidade) references tipo_unidade_tratamento(id)
);

create table coleta (
	id_coleta SERIAL primary key,
	descricao VARCHAR(100),
	quantidade_kg FLOAT,
	categoria VARCHAR(20),
	id_bairro INT not null,
	id_unidade_tratamento INT not null,
	foreign key (id_unidade_tratamento) references unidade_tratamento(id_unidade_tratamento),
	foreign key (id_bairro) references bairro(id)
);


-- VIEW para mostrar datalhes sobre coletas por categoria, ex: peso total, médio e quantidade de coletas. --

create or replace
view vw_detalhes_coleta as
select
	c.id_coleta,
	c.descricao,
	c.quantidade_kg,
	c.categoria,
	b.nome as nome_bairro,
	ut.nome as unidade_tratamento
from
	coleta c
inner join 
    bairro b on
	c.id_bairro = b.id
inner join 
    unidade_tratamento ut on
	c.id_unidade_tratamento = ut.id_unidade_tratamento;

select
	*
from
	vw_detalhes_coleta;


-- TRIGGER verifica maioridade de um pesquisador através da data de nascimento do pesq e a data atual. --

create or replace
function fn_verifica_maioridade() 
returns trigger as $$
begin
    if NEW.data_nascimento is not null then
        if AGE(CURRENT_DATE, NEW.data_nascimento) < interval '18 years' then
            raise exception 'Bloqueado: O pesquisador deve ser maior de 18 anos. Nascido em: %', 
            TO_CHAR(NEW.data_nascimento, 'DD/MM/YYYY');
end if;
end if;

return new;
end;

$$ language plpgsql;

drop trigger if exists trg_validar_idade_pesquisador on
pesquisador;

create trigger trg_validar_idade_pesquisador
before
insert
	or
update
	on
	pesquisador
for each row
execute function fn_verifica_maioridade();


-- PROCEDURE para atualizar o status de um pesquisador pelo ID. --

create or replace
procedure sp_desativar_pesquisador(
    p_cpf CHAR(14)
)
language plpgsql
as $$
begin
    update
	pesquisador
set
	status = 'Inativo'
where
	cpf = p_cpf;

if not found then
        raise notice 'Nenhum pesquisador encontrado com o CPF %.',
p_cpf;
end if;
end;

$$;

call sp_desativar_pesquisador('111.222.333-44');

