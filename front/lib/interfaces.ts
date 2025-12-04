export interface Pesquisador {
    id?: number,
    nome: string,
    foto_base64?: string|null,
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
    id?: number,
    nome: string,
    id_pesquisador: number,
}

export interface TipoUnidade {
    id: number,
    tipo: string,
}

export interface Unidade {
    id?: number,
    nome: string,
    endereco: string,
    estado: string,
    cidade: string,
    rua: string,
    id_tipo_unidade: number,
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