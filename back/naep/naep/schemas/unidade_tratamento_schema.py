from typing import Optional

from pydantic import BaseModel


# Schema de entrada (POST/PUT)
class UnidadeTratamentoSchema(BaseModel):
    nome: Optional[str] = None
    id_tipo_uni_tratamento: int
    endereco: Optional[str] = None
    estado: Optional[str] = None
    cidade: Optional[str] = None
    rua: Optional[str] = None


# Schema base do Banco (inclui ID)
class UnidadeTratamentoDB(UnidadeTratamentoSchema):
    id_unidade_tratamento: int

    class Config:
        from_attributes = True


# Schema público de retorno
class UnidadeTratamentoPublic(UnidadeTratamentoDB):
    pass
