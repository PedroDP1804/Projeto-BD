# CRUD - Status pesquisa
from http import HTTPStatus

from fastapi import APIRouter

from naep.models.models import StatusPesquisa
from naep.schemas.status_pesquisa_schema import (
    StatusPesquisaList,
    StatusPesquisaPublic,
    StatusPesquisaSchema,
)

db_status_pesquisa = []

router = APIRouter(prefix='/status-pesquisa', tags=['status-pesquisa'])


@router.post('/', status_code=HTTPStatus.CREATED, response_model=StatusPesquisaPublic)
def create_status(status: StatusPesquisaSchema):
    new_status = StatusPesquisa(
        id=len(db_status_pesquisa) + 1,
        **status.model_dump()
    )
    db_status_pesquisa.append(new_status)
    return new_status


@router.get('/', response_model=StatusPesquisaList)
def read_status():
    return {'status_pesquisa': db_status_pesquisa}
