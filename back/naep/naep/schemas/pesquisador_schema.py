from datetime import date
from typing import List
from pydantic import BaseModel, EmailStr


# -------- Entrada (POST / PUT) --------
class PesquisadorSchema(BaseModel):
    nome: str
    email: EmailStr
    cpf: str
    data_nascimento: date
    status: str
    telefones: list[str]

# -------- Saída do BD --------
class PesquisadorDB(BaseModel):
    id: int
    nome: str
    email: str
    cpf: str
    data_nascimento: date
    status: str
    telefones: List[str] = []

    class Config:
        from_attributes = True


# -------- Exposição pública --------
class PesquisadorPublic(PesquisadorDB):
    pass
