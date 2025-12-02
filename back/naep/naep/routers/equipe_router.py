# naep/routers/equipe_router.py

from http import HTTPStatus

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from naep.dependencies import get_db
from naep.models import Equipe
from naep.schemas.equipe_schema import (
    EquipePublic,
    EquipeSchema,
)

router = APIRouter(prefix="/equipes", tags=["equipes"])


# Criar equipe
@router.post("/", status_code=HTTPStatus.CREATED, response_model=EquipePublic)
def create_equipe(equipe: EquipeSchema, db: Session = Depends(get_db)):
    nova_equipe = Equipe(
        nome=equipe.nome,
        id_pesquisador=equipe.id_pesquisador,
    )

    db.add(nova_equipe)
    db.commit()
    db.refresh(nova_equipe)

    return nova_equipe


# Listar equipes
@router.get("/", response_model=list[EquipePublic])
def listar_equipes(db: Session = Depends(get_db)):
    return db.query(Equipe).all()


# Obter equipe por ID
@router.get("/{equipe_id}", response_model=EquipePublic)
def get_equipe(equipe_id: int, db: Session = Depends(get_db)):
    equipe = db.query(Equipe).filter(Equipe.id_equipe == equipe_id).first()

    if not equipe:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail="Equipe não encontrada",
        )

    return equipe


# Atualizar equipe
@router.put("/{equipe_id}", response_model=EquipePublic)
def update_equipe(equipe_id: int, equipe: EquipeSchema, db: Session = Depends(get_db)):
    equipe_db = db.query(Equipe).filter(Equipe.id_equipe == equipe_id).first()

    if not equipe_db:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail="Equipe não encontrada",
        )

    equipe_db.nome = equipe.nome
    equipe_db.id_pesquisador = equipe.id_pesquisador

    db.commit()
    db.refresh(equipe_db)

    return equipe_db
