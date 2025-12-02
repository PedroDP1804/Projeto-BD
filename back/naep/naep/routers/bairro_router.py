# CRUD - Bairro
from http import HTTPStatus
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from naep.dependencies import get_db
from naep.models import Bairro
from naep.schemas.bairro_schema import (
    BairroDB,
    BairroPublic,
    BairroSchema,
)

router = APIRouter(prefix="/bairros", tags=["bairros"])


@router.post("/", status_code=HTTPStatus.CREATED, response_model=BairroPublic)
def create_bairro(bairro: BairroSchema, db: Session = Depends(get_db)):
    novo_bairro = Bairro(
        nome=bairro.nome,
        id_frequencia=bairro.id_frequencia
    )

    db.add(novo_bairro)
    db.commit()
    db.refresh(novo_bairro)

    return novo_bairro


@router.get("/", response_model=list[BairroPublic])
def listar_bairros(db: Session = Depends(get_db)):
    return db.query(Bairro).all()
