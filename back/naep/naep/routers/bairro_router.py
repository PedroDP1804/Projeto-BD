# CRUD - Bairro


from http import HTTPStatus

from fastapi import APIRouter

from naep.schemas.bairro_schema import (
    BairroDB,
    BairroList,
    BairroPublic,
    BairroSchema,
)

db_bairro = []

router = APIRouter(prefix='/bairros', tags=['bairros'])


@router.post('/', status_code=HTTPStatus.CREATED, response_model=BairroPublic)
def create_bairro(bairro: BairroSchema):
    new_bairro = BairroDB(
        id=len(db_bairro) + 1,
        **bairro.model_dump()
    )
    db_bairro.append(new_bairro)
    return new_bairro


@router.get('/', response_model=BairroList)
def read_bairros():
    return {'bairros': db_bairro}
