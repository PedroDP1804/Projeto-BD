from http import HTTPStatus
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from naep.dependencies import get_db
from naep.models import UnidadeTratamento
from naep.schemas.schemas import Message
from naep.schemas.unidade_tratamento_schema import (
    UnidadeTratamentoPublic,
    UnidadeTratamentoSchema,
)

router = APIRouter(prefix="/unidades-tratamento", tags=["unidades-tratamento"])


# CREATE --------------------------------------------------
@router.post(
    "/",
    status_code=HTTPStatus.CREATED,
    response_model=UnidadeTratamentoPublic,
)
def create_unidade(
    unidade: UnidadeTratamentoSchema, db: Session = Depends(get_db)
):
    # Cria a instância do model
    nova_unidade = UnidadeTratamento(**unidade.model_dump())

    # O banco validará se id_tipo_uni_tratamento existe (Foreign Key)
    db.add(nova_unidade)
    db.commit()
    db.refresh(nova_unidade)

    return nova_unidade


# READ ALL ------------------------------------------------
@router.get("/", response_model=List[UnidadeTratamentoPublic])
def listar_unidades(db: Session = Depends(get_db)):
    return db.query(UnidadeTratamento).all()


# READ BY ID ----------------------------------------------
@router.get(
    "/{unidade_id}",
    status_code=HTTPStatus.OK,
    response_model=UnidadeTratamentoPublic,
)
def read_unidade_by_id(unidade_id: int, db: Session = Depends(get_db)):
    unidade_db = (
        db.query(UnidadeTratamento)
        .filter(UnidadeTratamento.id_unidade_tratamento == unidade_id)
        .first()
    )

    if not unidade_db:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND, detail="Unidade não encontrada"
        )

    return unidade_db


# UPDATE --------------------------------------------------
@router.put(
    "/{unidade_id}",
    response_model=UnidadeTratamentoPublic,
)
def update_unidade(
    unidade_id: int,
    unidade_schema: UnidadeTratamentoSchema,
    db: Session = Depends(get_db),
):
    unidade_db = (
        db.query(UnidadeTratamento)
        .filter(UnidadeTratamento.id_unidade_tratamento == unidade_id)
        .first()
    )

    if not unidade_db:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail="Unidade não encontrada",
        )

    # Atualiza os campos
    for key, value in unidade_schema.model_dump().items():
        setattr(unidade_db, key, value)

    db.commit()
    db.refresh(unidade_db)

    return unidade_db


# DELETE --------------------------------------------------
@router.delete(
    "/{unidade_id}",
    response_model=Message,
)
def delete_unidade(unidade_id: int, db: Session = Depends(get_db)):
    unidade_db = (
        db.query(UnidadeTratamento)
        .filter(UnidadeTratamento.id_unidade_tratamento == unidade_id)
        .first()
    )

    if not unidade_db:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail="Unidade não encontrada",
        )

    db.delete(unidade_db)
    db.commit()

    return {"message": "Unidade deletada com sucesso"}
