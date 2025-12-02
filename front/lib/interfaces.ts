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
    id_frequencia: number
    periodo: string
}

export interface Bairro {
    id_bairro?: number
    nome: string
    id_frequencia: number
    frequencia?: Frequencia
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