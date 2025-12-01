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
