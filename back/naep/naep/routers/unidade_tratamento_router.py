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

router = APIRouter(prefix="/unidades", tags=["unidades  "])

# -------------------------------
# Criar Unidade de Tratamento
# -------------------------------
@router.post("/", status_code=HTTPStatus.CREATED, response_model=UnidadeTratamentoPublic)
def create_unidade(unidade: UnidadeTratamentoSchema, db: Session = Depends(get_db)):

    nova_unidade = UnidadeTratamento(
        nome=unidade.nome,
        id_tipo_unidade=unidade.id_tipo_unidade,
        endereco=unidade.endereco,
        estado=unidade.estado,
        cidade=unidade.cidade,
        rua=unidade.rua
    )  
    
    db.add(nova_unidade)
    db.commit()
    db.refresh(nova_unidade)

    return UnidadeTratamentoPublic(
        id=nova_unidade.id,
        nome=nova_unidade.nome,
        id_tipo_unidade=nova_unidade.id_tipo_unidade,
        endereco=nova_unidade.endereco,
        estado=nova_unidade.estado,
        cidade=nova_unidade.cidade,
        rua=nova_unidade.rua
    )


# -------------------------------
# Listar todas as Unidades de Tratamento
# -------------------------------
@router.get("/", response_model=List[UnidadeTratamentoPublic])
def listar_unidades(db: Session = Depends(get_db)):

    unidades = db.query(UnidadeTratamento).all()
    resultado = []

    for u in unidades:

        resultado.append(
            UnidadeTratamentoPublic(
                id=u.id,
                nome=u.nome,
                id_tipo_unidade=u.id_tipo_unidade,
                endereco=u.endereco,
                estado=u.estado,
                cidade=u.cidade,
                rua=u.rua
            )
        )

    return resultado


# -------------------------------
# Atualizar Unidade de Tratamento
# -------------------------------
@router.put("/{id}", response_model=UnidadeTratamentoPublic)
def update_unidade(id: int, data: UnidadeTratamentoSchema, db: Session = Depends(get_db)):

    unidade = db.query(UnidadeTratamento).filter(UnidadeTratamento.id == id).first()

    if not unidade:
        raise HTTPException(status_code=404, detail="Unidade não encontrada")

    # Atualizar campos
    unidade.nome=data.nome
    unidade.id_tipo_unidade=data.id_tipo_unidade
    unidade.endereco=data.endereco
    unidade.estado=data.estado
    unidade.cidade=data.cidade
    unidade.rua=data.rua

    db.commit()
    db.refresh(unidade)

    return UnidadeTratamentoPublic(
        id=unidade.id,
        nome=unidade.nome,
        id_tipo_unidade=unidade.id_tipo_unidade,
        endereco=unidade.endereco,
        estado=unidade.estado,
        cidade=unidade.cidade,
        rua=unidade.rua
    )


# -------------------------------
# Deletar Unidade de Tratamento
# -------------------------------
@router.delete("/{id}", response_model=bool)
def delete_unidade(id: int, db: Session = Depends(get_db)):

    unidade = db.query(UnidadeTratamento).filter(
        UnidadeTratamento.id == id
    ).first()

    if not unidade:
        raise HTTPException(status_code=404, detail="Unidade não encontrada")

    db.delete(unidade)
    db.commit()

    return True