from pydantic import BaseModel

# Schemas para models auxiliares


class Message(BaseModel):
    message: str



# -------------------------------
# Frequencia
# -------------------------------

class FrequenciaSchema(BaseModel):
    periodo: str

class FrequenciaPublic(FrequenciaSchema):
    id: int



# -------------------------------
# Tipo Unidade de Tratamento
# -------------------------------
class TipoUnidadeSchema(BaseModel):
    tipo: str

class TipoUnidadePublic(TipoUnidadeSchema):
    id: int
