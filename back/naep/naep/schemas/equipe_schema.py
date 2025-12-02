# naep/schemas/equipe_schema.py
from pydantic import BaseModel


# Schema recebido no POST
class EquipeSchema(BaseModel):
    nome: str
    id_pesquisador: int  # obrigatório segundo seu model


# Objeto retornado pelo banco
class EquipeDB(EquipeSchema):
    id_equipe: int

    class Config:
        from_attributes = True


# Schema retornado publicamente
class EquipePublic(EquipeDB):
    pass
