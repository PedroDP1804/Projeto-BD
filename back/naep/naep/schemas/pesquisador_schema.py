# naep/schemas/pesquisador_schema.py
from datetime import date
from typing import List
from pydantic import BaseModel, EmailStr


# -------- Entrada (POST / PUT) --------
class PesquisadorSchema(BaseModel):
    nome: str
    email: EmailStr
    cpf: str
    data_nasc: date

    endereco: str | None = None
    estado: str | None = None
    cidade: str | None = None
    rua: str | None = None

    telefones: List[str]


# -------- Saída do BD --------
class PesquisadorDB(BaseModel):
    id_pesquisador: int
    nome: str | None
    email: str | None
    cpf: str | None
    data_nasc: date | None

    endereco: str | None
    estado: str | None
    cidade: str | None
    rua: str | None

    telefones: List[str] = []

    class Config:
        from_attributes = True


# -------- Exposição pública --------
class PesquisadorPublic(PesquisadorDB):
    pass


# -------- Lista --------
class PesquisadorList(BaseModel):
    pesquisadores: List[PesquisadorPublic]
