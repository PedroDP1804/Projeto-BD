from typing import List
from pydantic import BaseModel

# Status Pesquisa


class StatusPesquisaSchema(BaseModel):
    status: str


class StatusPesquisaDB(StatusPesquisaSchema):
    id: int


class StatusPesquisaPublic(StatusPesquisaDB):
    pass


class StatusPesquisaList(BaseModel):
    status_pesquisa: List[StatusPesquisaPublic]
