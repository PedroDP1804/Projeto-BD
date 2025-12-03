from pydantic import BaseModel
from typing import List
from naep.schemas.schemas import FrequenciaPublic

# -------- Entrada (POST / PUT) --------
class BairroSchema(BaseModel):
    nome: str
    id_frequencia: int


# -------- Saída do BD --------
class BairroDB(BairroSchema):
    id: int

    class Config:
        from_attributes = True  # permite converter objetos SQLAlchemy para Pydantic


# -------- Schema público retornado nas rotas --------
class BairroPublic(BairroDB):
    pass
