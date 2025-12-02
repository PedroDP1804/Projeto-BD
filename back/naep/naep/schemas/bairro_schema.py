from typing import List

from pydantic import BaseModel

# Bairro


class BairroSchema(BaseModel):
    nome: str


class BairroDB(BairroSchema):
    id: int


class BairroPublic(BairroDB):
    pass


class BairroList(BaseModel):
    bairros: List[BairroPublic]
