from http import HTTPStatus

from fastapi import APIRouter

from naep.schemas.tipo_lixo_schema import (
    TipoLixoDB,
    TipoLixoList,
    TipoLixoPublic,
    TipoLixoSchema,
)

db_tipo_lixo = []

router = APIRouter(prefix='/tipos_lixo', tags=['tipos_lixo'])

# CRUD - TIpo lixo


@router.post('/', status_code=HTTPStatus.CREATED, response_model=TipoLixoPublic)
def create_tipo_lixo(tipo: TipoLixoSchema):
    new_tipo = TipoLixoDB(
        id=len(db_tipo_lixo) + 1,
        **tipo.model_dump()
    )
    db_tipo_lixo.append(new_tipo)
    return new_tipo


@router.get('/', response_model=TipoLixoList)
def read_tipos_lixo():
    return {'tipos_lixo': db_tipo_lixo}
