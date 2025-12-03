# naep/schemas/equipe_schema.py
from pydantic import BaseModel

# -------- Entrada (POST / PUT) --------
class EquipeSchema(BaseModel):
    nome: str
    id_pesquisador: int


# -------- Saída do BD --------
class EquipeDB(EquipeSchema):
    id: int

    class Config:
        from_attributes = True


# -------- Schema público retornado nas rotas  --------
class EquipePublic(EquipeDB):
    pass
