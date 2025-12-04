from http import HTTPStatus
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from naep.dependencies import get_db
from naep.models import Coleta
from naep.schemas.coleta_schema import (
    ColetaPublic,
    ColetaSchema,
)

router = APIRouter(prefix="/coletas", tags=["coletas"])

# -------------------------------
# Criar Coleta
# -------------------------------
@router.post("/", status_code=HTTPStatus.CREATED, response_model=ColetaPublic)
def create_coleta(coleta: ColetaSchema, db: Session = Depends(get_db)):

    nova_coleta = Coleta(
        descricao=coleta.descricao,
        quantidade_kg=coleta.quantidade_kg,
        categoria=coleta.categoria,
        id_bairro=coleta.id_bairro,
        id_unidade_tratamento=coleta.id_unidade_tratamento
    )  
    
    db.add(nova_coleta)
    db.commit()
    db.refresh(nova_coleta)

    return ColetaPublic(
        id=nova_coleta.id,
        descricao=nova_coleta.descricao,
        quantidade_kg=nova_coleta.quantidade_kg,
        categoria=nova_coleta.categoria,
        id_bairro=nova_coleta.id_bairro,
        id_unidade_tratamento=nova_coleta.id_unidade_tratamento
    )


# -------------------------------
# Listar todas as Coletas
# -------------------------------
@router.get("/", response_model=List[ColetaPublic])
def listar_coletas(db: Session = Depends(get_db)):

    coletas = db.query(Coleta).all()
    resultado = []

    for c in coletas:

        resultado.append(
            ColetaPublic(
                id=c.id,
                descricao=c.descricao,
                quantidade_kg=c.quantidade_kg,
                categoria=c.categoria,
                id_bairro=c.id_bairro,
                id_unidade_tratamento=c.id_unidade_tratamento
            )
        )

    return resultado


# -------------------------------
# Atualizar Unidade de Tratamento
# -------------------------------
@router.put("/{id}", response_model=ColetaPublic)
def update_coleta(id: int, data: ColetaSchema, db: Session = Depends(get_db)):

    coleta = db.query(Coleta).filter(Coleta.id == id).first()

    if not coleta:
        raise HTTPException(status_code=404, detail="Coleta não encontrada")

    # Atualizar campos
    coleta.descricao=data.descricao
    coleta.quantidade_kg=data.quantidade_kg
    coleta.categoria=data.categoria
    coleta.id_bairro=data.id_bairro
    coleta.id_unidade_tratamento=data.id_unidade_tratamento

    db.commit()
    db.refresh(coleta)

    return ColetaPublic(
        id=coleta.id,
        descricao=coleta.descricao,
        quantidade_kg=coleta.quantidade_kg,
        categoria=coleta.categoria,
        id_bairro=coleta.id_bairro,
        id_unidade_tratamento=coleta.id_unidade_tratamento
    )


# -------------------------------
# Deletar Unidade de Tratamento
# -------------------------------
@router.delete("/{id}", response_model=bool)
def delete_coleta(id: int, db: Session = Depends(get_db)):

    coleta = db.query(Coleta).filter(
        Coleta.id == id
    ).first()

    if not coleta:
        raise HTTPException(status_code=404, detail="Coleta não encontrada")

    db.delete(coleta)
    db.commit()

    return True