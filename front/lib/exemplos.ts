import { Bairro, Coleta, Equipe, Frequencia, Pesquisa, Pesquisador, StatusPesquisa, TipoUnidade, Unidade } from "./interfaces";

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

export const frequencias_exemplo:Frequencia[] = [
    { id: 1, periodo: "Diária" },
    { id: 2, periodo: "Semanal" },
    { id: 3, periodo: "Quinzenal" },
    { id: 4, periodo: "Mensal" },
    { id: 5, periodo: "Semestral" },
    { id: 6, periodo: "Anual" },
]

export const bairros_exemplo:Bairro[] = [
    { id: 1, nome: "Itapoã I", id_frequencia: 1},
    { id: 2, nome: "Itapoã II", id_frequencia: 2},
    { id: 3, nome: "Itapoã III", id_frequencia: 5},
    { id: 4, nome: "Del Lago", id_frequencia: 4},
    { id: 5, nome: "Paranoá Park", id_frequencia: 3},
]

export const equipes_exemplo:Equipe[] = [
    { id: 1, nome: "Equipe Cerrado", id_pesquisador: 2 },
    { id: 2, nome: "Equipe Savana", id_pesquisador: 4 },
    { id: 3, nome: "Equipe Linkin Park", id_pesquisador: 3 },
    { id: 4, nome: "Equipe Campo Limpo", id_pesquisador: 1 },
    { id: 5, nome: "Equipe Lírios", id_pesquisador: 5 },
];

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


export const coletas_exemplo:Coleta[] = [
    {
        id_coleta: 1,
        descricao: "Coleta de resíduos orgânicos domiciliares",
        quantidade_kg: 125,
        categoria: "Orgânico",
        bairro: bairros_exemplo[2],
        unidade_tratamento: unidades_exemplo[4],
    },
    {
        id_coleta: 2,
        descricao: "Coleta de recicláveis secos da área comercial",
        quantidade_kg: 89,
        categoria: "Recicláveis",
        bairro: bairros_exemplo[0],
        unidade_tratamento: unidades_exemplo[1],
    },
    {
        id_coleta: 3,
        descricao: "Coleta de entulho leve em via pública",
        quantidade_kg: 310,
        categoria: "Entulho",
        bairro: bairros_exemplo[3],
        unidade_tratamento: unidades_exemplo[2],
    },
    {
        id_coleta: 4,
        descricao: "Coleta de resíduos verdes após poda",
        quantidade_kg: 450,
        categoria: "Verde",
        bairro: bairros_exemplo[1],
        unidade_tratamento: unidades_exemplo[0],
    },
    {
        id_coleta: 5,
        descricao: "Coleta de volumosos em mutirão local",
        quantidade_kg: 520,
        categoria: "Volumosos",
        bairro: bairros_exemplo[4],
        unidade_tratamento: unidades_exemplo[3],
    },
];

export const status_pesquisa_exemplo:StatusPesquisa[] = [
    { id_status_pesquisa: 1, status: "Planejada" },
    { id_status_pesquisa: 2, status: "Em andamento" },
    { id_status_pesquisa: 3, status: "Concluída" },
    { id_status_pesquisa: 4, status: "Cancelada" },
    { id_status_pesquisa: 5, status: "Suspensa" },
];

export const pesquisas_exemplo: Pesquisa[] = [
    {
        id_pesquisa: 1,
        descricao: "Avaliação de coleta e descarte no setor Itapoã Norte",
        data_inicio: new Date(2024, 0, 10), // 10/01/2024
        data_fim: new Date(2024, 2, 15),    // 15/03/2024
        frequencia: frequencias_exemplo[1], // Semanal
        status_pesquisa: status_pesquisa_exemplo[1], // Em andamento
        equipe: equipes_exemplo[0],
    },
    {
        id_pesquisa: 2,
        descricao: "Mapeamento de resíduos orgânicos em áreas comerciais",
        data_inicio: new Date(2023, 5, 1),  // 01/06/2023
        data_fim: new Date(2023, 10, 28),   // 28/11/2023
        frequencia: frequencias_exemplo[3], // Mensal
        status_pesquisa: status_pesquisa_exemplo[2], // Concluída
        equipe: equipes_exemplo[2],
    },
    {
        id_pesquisa: 3,
        descricao: "Estudo sobre geração de entulho em obras residenciais",
        data_inicio: new Date(2024, 3, 5), // 05/04/2024
        data_fim: new Date(2024, 8, 30),   // 30/09/2024
        frequencia: frequencias_exemplo[0], // Diária
        status_pesquisa: status_pesquisa_exemplo[0], // Planejada
        equipe: equipes_exemplo[3],
    },
    {
        id_pesquisa: 4,
        descricao: "Monitoramento de resíduos verdes após ações de poda urbana",
        data_inicio: new Date(2024, 1, 12), // 12/02/2024
        data_fim: new Date(2024, 5, 14),    // 14/06/2024
        frequencia: frequencias_exemplo[4], // Semestral
        status_pesquisa: status_pesquisa_exemplo[3], // Cancelada
        equipe: equipes_exemplo[1],
    },
    {
        id_pesquisa: 5,
        descricao: "Estudo de geração de volumosos em mutirões comunitários",
        data_inicio: new Date(2023, 8, 20), // 20/09/2023
        data_fim: new Date(2024, 0, 20),    // 20/01/2024
        frequencia: frequencias_exemplo[2], // Quinzenal
        status_pesquisa: status_pesquisa_exemplo[4], // Suspensa
        equipe: equipes_exemplo[4],
    },
];