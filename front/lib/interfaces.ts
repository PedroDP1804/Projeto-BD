export interface Pesquisador {
    id?: number,
    nome: string,
    email: string,
    cpf: string,
    data_nascimento: Date,
    telefones: string[],
    status: "Ativo" | "Inativo",
}

export interface Frequencia {
    id: number
    periodo: string
}

export interface Bairro {
    id?: number
    nome: string
    id_frequencia: number,
}

export interface Equipe {
    id_equipe?: number,
    nome: string,
    pesquisador: Pesquisador,
}

export interface TipoUnidade {
    id_tipo_unidade: number,
    tipo: string,
}

export interface Unidade {
    id_unidade?: number,
    nome: string,
    endereco: string,
    estado: string,
    cidade: string,
    rua: string,
    tipo: TipoUnidade,
}

export interface Coleta {
    id_coleta?: number,
    descricao: string,
    quantidade_kg: number,
    categoria: string,
    bairro: Bairro,
    unidade_tratamento: Unidade,
}

export interface StatusPesquisa {
    id_status_pesquisa: number;
    status: string;
}

export interface Pesquisa {
    id_pesquisa?: number;
    descricao: string;
    data_inicio: Date;
    data_fim: Date;
    frequencia: Frequencia;
    status_pesquisa: StatusPesquisa;
    equipe: Equipe;
}