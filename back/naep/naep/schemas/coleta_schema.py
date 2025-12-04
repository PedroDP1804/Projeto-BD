from pydantic import BaseModel

# -------- Entrada (POST / PUT) --------
class ColetaSchema(BaseModel):
    descricao: str
    quantidade_kg: float
    categoria: str
    id_bairro: int
    id_unidade_tratamento: int


# -------- Saída do BD --------
class ColetaDB(ColetaSchema):
    id: int

    class Config:
        from_attributes = True


# -------- Schema público retornado nas rotas --------
class ColetaPublic(ColetaDB):
    pass
