from typing import List

from pydantic import BaseModel

# Tipo de Lixo


class TipoLixoSchema(BaseModel):
    categoria: str


class TipoLixoDB(TipoLixoSchema):
    id: int


class TipoLixoPublic(TipoLixoDB):
    pass


class TipoLixoList(BaseModel):
    tipos_lixo: List[TipoLixoPublic]
