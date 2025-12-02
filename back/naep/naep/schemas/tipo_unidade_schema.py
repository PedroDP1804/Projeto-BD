from pydantic import BaseModel

# Tipo de Unidade de Tratamento (ex.: Reciclagem, Compostagem, Aterro, etc.)

class TipoUnidadeSchema(BaseModel):
    tipo: str  # nome da categoria/tipo


class TipoUnidadeDB(TipoUnidadeSchema):
    id_tipo_uni_tratamento: int

    class Config:
        from_attributes = True


class TipoUnidadePublic(TipoUnidadeDB):
    pass
