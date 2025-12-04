from datetime import date
from typing import List
from pydantic import BaseModel, EmailStr


# -------- Entrada (POST / PUT) --------
class PesquisadorSchema(BaseModel):
    nome: str
    foto_base64: str | None = None
    email: EmailStr
    cpf: str
    data_nascimento: date
    status: str
    telefones: list[str]

# -------- Saída do BD --------
class PesquisadorDB(PesquisadorSchema):
    id: int

    class Config:
        from_attributes = True


# -------- Exposição pública --------
class PesquisadorPublic(PesquisadorDB):
    pass
