from datetime import date
from typing import List

from pydantic import BaseModel, EmailStr


class Message(BaseModel):
    message: str


class UserSchema(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserPublic(BaseModel):
    id: int
    username: str
    email: str


class UserDB(UserSchema):
    id: int


class UserList(BaseModel):
    users: list[UserPublic]


class EnderecoSchema(BaseModel):
    rua: str
    cidade: str
    estado: str


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
