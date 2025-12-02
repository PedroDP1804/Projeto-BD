from datetime import date
from typing import List

from pydantic import BaseModel


class PesquisaSchema(BaseModel):
    descricao: str
    data_inicio: date
    data_fim: date
    id_status_pesquisa: int
    id_pesquisador_responsavel: int


class PesquisaDB(PesquisaSchema):
    id: int


class PesquisaPublic(PesquisaDB):
    pass


class PesquisaList(BaseModel):
    pesquisas: List[PesquisaPublic]
