import { Equipe } from "@/app/(main)/equipes/page";
import { Pesquisador } from "@/app/(main)/pesquisadores/page";
import { TipoUnidade, Unidade } from "@/app/(main)/unidades/page";

export const pesquisadores_exemplo:Pesquisador[] = [
    {
        id: 1,
        nome: "Mariana Duarte",
        email: "marianaduarte@exemplo.com",
        cpf: "123.456.789-10",
        data_nascimento: new Date(1995, 2, 5,), //"05/03/1995"
        telefones: ["91234-5678"],
        status: "Inativo",
    },
    {
        id: 2,
        nome: "Rafael Almeida",
        email: "rafael.almeida@exemplo.com",
        cpf: "987.654.321-00",
        data_nascimento: new Date(1988, 7, 22), //"22/08/1988"
        telefones: ["99876-5432", "93456-7890"],
        status: "Ativo",
    },
    {
        id: 3,
        nome: "Juliana Silva",
        email: "juliana.silva@exemplo.com",
        cpf: "111.222.333-44",
        data_nascimento: new Date(1992, 9, 10), //"10/10/1992"
        telefones: ["97777-1111"],
        status: "Ativo",
    },
    {
        id: 4,
        nome: "Carlos Mendes",
        email: "carlos.mendes@exemplo.com",
        cpf: "555.666.777-88",
        data_nascimento: new Date(1985, 0, 18), //"18/01/1985"
        telefones: ["98888-2222", "90000-1111"],
        status: "Inativo",
    },
    {
        id: 5,
        nome: "Cleiton Santos",
        email: "cleiton.santos@exemplo.com",
        cpf: "522.444.999-25",
        data_nascimento: new Date(1985, 0, 19), //"18/01/1985"
        telefones: ["98038-4444", "90000-1111", "1224-9090"],
        status: "Ativo",
    },
];

export const frequencias_exemplo = [
    { id_frequencia: 1, periodo: "Diária" },
    { id_frequencia: 2, periodo: "Semanal" },
    { id_frequencia: 3, periodo: "Quinzenal" },
    { id_frequencia: 4, periodo: "Mensal" },
    { id_frequencia: 5, periodo: "Semestral" },
    { id_frequencia: 6, periodo: "Anual" },
]

export const bairros_exemplo = [
    { id_bairro: 1, nome: "Itapoã I", id_frequencia: 1, frequencia: { id_frequencia: 1, periodo: "Diária" }},
    { id_bairro: 2, nome: "Itapoã II", id_frequencia: 2, frequencia: { id_frequencia: 2, periodo: "Semanal" }},
    { id_bairro: 3, nome: "Itapoã III", id_frequencia: 5, frequencia: { id_frequencia: 5, periodo: "Semestral" }},
    { id_bairro: 4, nome: "Del Lago", id_frequencia: 4, frequencia: { id_frequencia: 4, periodo: "Mensal" }},
    { id_bairro: 5, nome: "Paranoá Park", id_frequencia: 3, frequencia: { id_frequencia: 3, periodo: "Quinzenal" }},
]

export const tipos_exemplo:TipoUnidade[] = [
    { id_tipo_unidade: 1, tipo: "Desativada" },
    { id_tipo_unidade: 2, tipo: "Temporária" },
    { id_tipo_unidade: 3, tipo: "Básica" },
    { id_tipo_unidade: 4, tipo: "Intermediária" },
    { id_tipo_unidade: 5, tipo: "Avançada" },
];

export const unidades_exemplo:Unidade[] = [
    {
        id_unidade: 1,
        nome: "Unidade Itapoã Norte",
        endereco: "Quadra 203 Conj. 6",
        estado: "DF",
        cidade: "Brasília",
        rua: "Rua das Mangueiras",
        tipo: tipos_exemplo[2],
    },
    {
        id_unidade: 2,
        nome: "Centro de Tratamento Lago Azul",
        endereco: "QI 10 Lote 18",
        estado: "DF",
        cidade: "Brasília",
        rua: "Rua Ipê Amarelo",
        tipo: tipos_exemplo[0],
    },
    {
        id_unidade: 3,
        nome: "Unidade Jardim Esperança",
        endereco: "Quadra 425 Conj. 2",
        estado: "DF",
        cidade: "Brasília",
        rua: "Rua do Cedro",
        tipo: tipos_exemplo[4],
    },
    {
        id_unidade: 4,
        nome: "Estação Saúde Itapoã Sul",
        endereco: "QI 32 Lote 7",
        estado: "DF",
        cidade: "Brasília",
        rua: "Rua das Acácias",
        tipo: tipos_exemplo[1],
    },
    {
        id_unidade: 5,
        nome: "Ponto de Atendimento Bem-Estar",
        endereco: "Quadra 605 Conj. 4",
        estado: "DF",
        cidade: "Brasília",
        rua: "Rua do Buriti",
        tipo: tipos_exemplo[3],
    },
];

export const equipes_exemplo:Equipe[] = [
    { id_equipe: 1, nome: "Equipe Cerrado", pesquisador: pesquisadores_exemplo[1] },
    { id_equipe: 2, nome: "Equipe Savana", pesquisador: pesquisadores_exemplo[3] },
    { id_equipe: 3, nome: "Equipe Linkin Park", pesquisador: pesquisadores_exemplo[2] },
    { id_equipe: 4, nome: "Equipe Campo Limpo", pesquisador: pesquisadores_exemplo[0] },
    { id_equipe: 5, nome: "Equipe Lírios", pesquisador: pesquisadores_exemplo[4] },
];
