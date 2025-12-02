from typing import List

from pydantic import BaseModel

# Status Pesquisa


class StatusPesquisaSchema(BaseModel):
    status: str


class StatusPesquisaPublic(StatusPesquisaSchema):
    id: int


class StatusPesquisaList(BaseModel):
    status_pesquisa: List[StatusPesquisaPublic]
