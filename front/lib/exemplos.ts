import { Pesquisador } from "@/app/(main)/pesquisadores/page";

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
