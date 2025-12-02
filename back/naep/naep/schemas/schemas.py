
from pydantic import BaseModel


class Message(BaseModel):
    message: str


class EnderecoSchema(BaseModel):
    rua: str
    cidade: str
    estado: str


# Tipo de Unidade de Tratamento


class TipoUniTratamentoSchema(BaseModel):
    tipo: str


class TipoUniTratamentoPublic(TipoUniTratamentoSchema):
    id: int


# Frequencia


class FrequenciaSchema(BaseModel):
    periodo: str


class FrequenciaPublic(FrequenciaSchema):
    id: int
