from http import HTTPStatus

from fastapi import APIRouter, HTTPException

from naep.schemas.pesquisador_schema import (
    PesquisadorDB,
    PesquisadorList,
    PesquisadorPublic,
    PesquisadorSchema,
)
from naep.schemas.schemas import Message

db_pesquisadores = []

# CRUD - Pesquisador


router = APIRouter(prefix='/pesquisadores', tags=['pesquisadores'])


@router.post(
    '/',
    status_code=HTTPStatus.CREATED,
    response_model=PesquisadorPublic,
)
def create_pesquisador(pesquisador: PesquisadorSchema):
    pesquisador_with_id = PesquisadorDB(
        id=len(db_pesquisadores) + 1, **pesquisador.model_dump()
    )

    db_pesquisadores.append(pesquisador_with_id)
    return pesquisador_with_id


@router.get('/', response_model=PesquisadorList)
def read_pesquisadores():
    return {'pesquisadores': db_pesquisadores}


@router.get(
    '/pesquisadores/{pesquisador_id}',
    status_code=HTTPStatus.OK,
    response_model=PesquisadorPublic,
)
def read_pesquisador_by_id(pesquisador_id: int):
    if pesquisador_id > len(db_pesquisadores) or pesquisador_id < 1:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND, detail='Pesquisador not found'
        )

    return db_pesquisadores[pesquisador_id - 1]


@router.put('/pesquisadores/{pesquisador_id}', response_model=PesquisadorPublic)
def update_pesquisador(pesquisador_id: int, pesquisador: PesquisadorSchema):
    if pesquisador_id > len(db_pesquisadores) or pesquisador_id < 1:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='Pesquisador not found',
        )

    pesquisador_with_id = PesquisadorDB(
        **pesquisador.model_dump(), id=pesquisador_id
    )
    db_pesquisadores[pesquisador_id - 1] = pesquisador_with_id

    return pesquisador_with_id


@router.delete('/pesquisadores/{pesquisador_id}', response_model=Message)
def delete_pesquisador(pesquisador_id: int):
    if pesquisador_id > len(db_pesquisadores) or pesquisador_id < 1:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND, detail='Pesquisa not found'
        )

    del db_pesquisadores[pesquisador_id - 1]

    return {'message': 'Pesquisador deleted'}
