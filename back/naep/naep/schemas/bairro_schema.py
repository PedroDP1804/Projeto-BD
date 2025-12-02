from pydantic import BaseModel


# Schema recebido no POST (entrada)
class BairroSchema(BaseModel):
    nome: str
    id_frequencia: int


# Schema retornado pelo banco (saída)
class BairroDB(BairroSchema):
    id_bairro: int

    class Config:
        from_attributes = True  # permite converter objetos SQLAlchemy para Pydantic


# Schema público retornado nas rotas
class BairroPublic(BairroDB):
    pass
