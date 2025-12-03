from http import HTTPStatus
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from naep.dependencies import get_db
from naep.models import Bairro
from naep.schemas.bairro_schema import (
    BairroPublic,
    BairroSchema
)
from naep.schemas.schemas import Message

router = APIRouter(prefix="/bairros", tags=["bairros"])



# -------------------------------
# Criar bairro
# -------------------------------
@router.post("/", status_code=HTTPStatus.CREATED, response_model=BairroPublic)
def create_bairro(bairro: BairroSchema, db: Session = Depends(get_db)):

    novo_bairro = Bairro(
        nome=bairro.nome,
        id_frequencia=bairro.id_frequencia
    )  
    
    db.add(novo_bairro)
    db.commit()
    db.refresh(novo_bairro)

    return BairroPublic(
        id=novo_bairro.id,
        nome=novo_bairro.nome,
        id_frequencia=novo_bairro.id_frequencia
    )

# -------------------------------
# Listar todos os bairros
# -------------------------------
@router.get("/", response_model=List[BairroPublic])
def listar_bairros(db: Session = Depends(get_db)):

    bairros = db.query(Bairro).all()
    resultado = []

    for b in bairros:

        resultado.append(
            BairroPublic(
                id=b.id,
                nome=b.nome,
                id_frequencia=b.id_frequencia
            )
        )

    return resultado


# -------------------------------
# Atualizar bairro
# -------------------------------
@router.put("/{id}", response_model=BairroPublic)
def update_bairro(id: int, data: BairroSchema, db: Session = Depends(get_db)):

    b = db.query(Bairro).filter(Bairro.id == id).first()

    if not b:
        raise HTTPException(status_code=404, detail="Bairro não encontrado")

    # Atualizar campos
    b.nome = data.nome
    b.id_frequencia = data.id_frequencia

    db.commit()
    db.refresh(b)

    return BairroPublic(
        id=b.id,
        nome=b.nome,
        id_frequencia=b.id_frequencia
    )


# -------------------------------
# Deletar bairro
# -------------------------------
@router.delete("/{id}", response_model=Message)
def delete_bairro(id: int, db: Session = Depends(get_db)):

    b = db.query(Bairro).filter(
        Bairro.id == id
    ).first()

    if not b:
        raise HTTPException(status_code=404, detail="Bairro não encontrado")

    db.delete(b)
    db.commit()

    return {"message": "Bairro deletado"}