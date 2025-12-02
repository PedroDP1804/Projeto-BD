from datetime import date
from typing import List

from pydantic import BaseModel, EmailStr

from naep.schemas.schemas import EnderecoSchema

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
