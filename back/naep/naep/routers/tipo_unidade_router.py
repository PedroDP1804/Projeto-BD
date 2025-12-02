from http import HTTPStatus

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from naep.dependencies import get_db
from naep.models import TipoUnidadeTratamento
from naep.schemas.schemas import Message
from naep.schemas.tipo_unidade_schema import (
    TipoUnidadePublic,
    TipoUnidadeSchema,
)

router = APIRouter(prefix="/tipos_unidade", tags=["tipos_unidade"])


# CREATE
@router.post("/", status_code=HTTPStatus.CREATED, response_model=TipoUnidadePublic)
def create_tipo_unidade(tipo: TipoUnidadeSchema, db: Session = Depends(get_db)):
    novo_tipo = TipoUnidadeTratamento(
        tipo=tipo.tipo
    )

    db.add(novo_tipo)
    db.commit()
    db.refresh(novo_tipo)

    return novo_tipo


# READ ALL
@router.get("/", response_model=list[TipoUnidadePublic])
def read_tipos_unidade(db: Session = Depends(get_db)):
    tipos = db.query(TipoUnidadeTratamento).all()
    return tipos


# READ BY ID
@router.get("/{tipo_id}", response_model=TipoUnidadePublic)
def read_tipo_unidade(tipo_id: int, db: Session = Depends(get_db)):
    tipo = (
        db.query(TipoUnidadeTratamento)
        .filter_by(id_tipo_uni_tratamento=tipo_id)
        .first()
    )

    if not tipo:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail="Tipo de unidade não encontrado"
        )

    return tipo


# UPDATE
@router.put("/{tipo_id}", response_model=TipoUnidadePublic)
def update_tipo_unidade(tipo_id: int, tipo_data: TipoUnidadeSchema, db: Session = Depends(get_db)):
    tipo = (
        db.query(TipoUnidadeTratamento)
        .filter_by(id_tipo_uni_tratamento=tipo_id)
        .first()
    )

    if not tipo:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail="Tipo de unidade não encontrado"
        )

    tipo.tipo = tipo_data.tipo

    db.commit()
    db.refresh(tipo)

    return tipo


# DELETE
@router.delete("/{tipo_id}", response_model=Message)
def delete_tipo_unidade(tipo_id: int, db: Session = Depends(get_db)):
    tipo = (
        db.query(TipoUnidadeTratamento)
        .filter_by(id_tipo_uni_tratamento=tipo_id)
        .first()
    )

    if not tipo:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail="Tipo de unidade não encontrado"
        )

    db.delete(tipo)
    db.commit()

    return {"message": "Tipo de unidade removido com sucesso"}
