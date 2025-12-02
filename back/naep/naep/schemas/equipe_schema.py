from typing import List

from pydantic import BaseModel

# Equipe


class EquipeSchema(BaseModel):
    nome: str


class EquipeDB(EquipeSchema):
    id: int


class EquipePublic(EquipeDB):
    pass


class EquipeList(BaseModel):
    equipes: List[EquipePublic]
