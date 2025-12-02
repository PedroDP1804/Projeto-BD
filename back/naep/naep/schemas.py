from datetime import date
from typing import List

from pydantic import BaseModel, EmailStr


class Message(BaseModel):
    message: str


class EnderecoSchema(BaseModel):
    rua: str
    cidade: str
    estado: str


# Pesquisador


class PesquisadorSchema(BaseModel):
    nome: str
    email: EmailStr
    cpf: str
    data_nasc: date
    telefones: List[str]
    endereco: EnderecoSchema


class PesquisadorDB(PesquisadorSchema):
    id: int


class PesquisadorPublic(PesquisadorDB):
    pass


class PesquisadorList(BaseModel):
    pesquisadores: List[PesquisadorPublic]


# Pesquisa


class PesquisaSchema(BaseModel):
    descricao: str
    data_inicio: date
    data_fim: date
    id_status_pesquisa: int
    id_pesquisador_responsavel: int


class PesquisaDB(PesquisaSchema):
    id: int


class PesquisaPublic(PesquisaDB):
    pass


class PesquisaList(BaseModel):
    pesquisas: List[PesquisaPublic]


# Equipe


class EquipeSchema(BaseModel):
    nome: str


class EquipeDB(EquipeSchema):
    id: int


class EquipePublic(EquipeDB):
    pass


class EquipeList(BaseModel):
    equipes: List[EquipePublic]
