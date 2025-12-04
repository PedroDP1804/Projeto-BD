from typing import Optional
from pydantic import BaseModel

# -------- Entrada (POST / PUT) --------
class UnidadeTratamentoSchema(BaseModel):
    nome: str
    id_tipo_unidade: int
    endereco: str
    estado: str
    cidade: str
    rua: str


# -------- Saída do BD --------
class UnidadeTratamentoDB(UnidadeTratamentoSchema):
    id: int

    class Config:
        from_attributes = True


# -------- Schema público retornado nas rotas --------
class UnidadeTratamentoPublic(UnidadeTratamentoDB):
    pass