from http import HTTPStatus

from fastapi import APIRouter, HTTPException

from naep.schemas.pesquisa_schema import (
    PesquisaDB,
    PesquisaList,
    PesquisaPublic,
    PesquisaSchema,
)
from naep.schemas.schemas import Message

db_pesquisas = []


# CRUD - Pesquisas


router = APIRouter(prefix='/pesquisas', tags=['pesquisas'])


@router.post(
    '/',
    status_code=HTTPStatus.CREATED,
    response_model=PesquisaPublic,
)
def create_pesquisa(pesquisa: PesquisaSchema):
    if (
        pesquisa.id_pesquisador_responsavel > len(db_pesquisas)
        or pesquisa.id_pesquisador_responsavel < 1
    ):
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail='Pesquisador ID invalid',
        )

    pesquisa_with_id = PesquisaDB(
        id=len(db_pesquisas) + 1, **pesquisa.model_dump()
    )

    db_pesquisas.append(pesquisa_with_id)
    return pesquisa_with_id


@router.get('/', response_model=PesquisaList)
def read_pesquisas():
    return {'pesquisas': db_pesquisas}


@router.put('/pesquisas/{pesquisa_id}', response_model=PesquisaPublic)
def update_pesquisa(pesquisa_id: int, pesquisa: PesquisaSchema):
    if pesquisa_id > len(db_pesquisas) or pesquisa_id < 1:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND, detail='Pesquisa not found'
        )

    pesquisa_with_id = PesquisaDB(**pesquisa.model_dump(), id=pesquisa_id)
    db_pesquisas[pesquisa_id - 1] = pesquisa_with_id

    return pesquisa_with_id


@router.delete('/pesquisas/{pesquisa_id}', response_model=Message)
def delete_pesquisa(pesquisa_id: int):
    if pesquisa_id > len(db_pesquisas) or pesquisa_id < 1:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND, detail='Pesquisa not found'
        )

    del db_pesquisas[pesquisa_id - 1]

    return {'message': 'Pesquisa deleted'}
