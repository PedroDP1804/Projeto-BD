from pydantic import BaseModel

# -------- Entrada (POST / PUT) --------
class BairroSchema(BaseModel):
    nome: str
    id_frequencia: int


# -------- Saída do BD --------
class BairroDB(BairroSchema):
    id: int

    class Config:
        from_attributes = True


# -------- Schema público retornado nas rotas --------
class BairroPublic(BairroDB):
    pass
