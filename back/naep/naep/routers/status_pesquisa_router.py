# CRUD - Status pesquisa
from http import HTTPStatus
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from naep.dependencies import get_db
from naep.models import (
    StatusPesquisa,  # Certifique-se de que o model StatusPesquisa existe
)
from naep.schemas.schemas import Message
from naep.schemas.status_pesquisa_schema import (
    StatusPesquisaPublic,
    StatusPesquisaSchema,
)

router = APIRouter(prefix='/status-pesquisa', tags=['status-pesquisa'])


@router.post(
    '/',
    status_code=HTTPStatus.CREATED,
    response_model=StatusPesquisaPublic,
)
def create_status(status: StatusPesquisaSchema, db: Session = Depends(get_db)):
    # Transforma o schema Pydantic no model SQLAlchemy
    novo_status = StatusPesquisa(**status.model_dump())

    db.add(novo_status)
    db.commit()
    db.refresh(novo_status)

    return novo_status


@router.get('/', response_model=List[StatusPesquisaPublic])
def read_status(db: Session = Depends(get_db)):
    # Retorna todos os status do banco de dados
    return db.query(StatusPesquisa).all()


@router.get(
    '/{status_id}',
    status_code=HTTPStatus.OK,
    response_model=StatusPesquisaPublic,
)
def read_status_by_id(status_id: int, db: Session = Depends(get_db)):
    # Busca pelo ID (assumindo id_status_pesquisa como chave primária)
    status_db = db.query(StatusPesquisa).filter(StatusPesquisa.id_status_pesquisa == status_id).first()

    if not status_db:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND, detail='Status not found'
        )

    return status_db


@router.put(
    '/{status_id}',
    response_model=StatusPesquisaPublic,
)
def update_status(
    status_id: int,
    status_schema: StatusPesquisaSchema,
    db: Session = Depends(get_db)
):
    status_db = db.query(StatusPesquisa).filter(StatusPesquisa.id_status_pesquisa == status_id).first()

    if not status_db:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='Status not found',
        )

    # Atualiza os campos
    for key, value in status_schema.model_dump().items():
        setattr(status_db, key, value)

    db.commit()
    db.refresh(status_db)

    return status_db


@router.delete(
    '/{status_id}',
    response_model=Message,
)
def delete_status(status_id: int, db: Session = Depends(get_db)):
    status_db = db.query(StatusPesquisa).filter(StatusPesquisa.id_status_pesquisa == status_id).first()

    if not status_db:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='Status not found',
        )

    db.delete(status_db)
    db.commit()

    return {'message': 'Status pesquisa deleted'}
