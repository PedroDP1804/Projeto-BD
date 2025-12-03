from http import HTTPStatus
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from naep.dependencies import get_db
from naep.models import Equipe
from naep.schemas.equipe_schema import (
    EquipeSchema,
    EquipePublic,
)

router = APIRouter(prefix="/equipes", tags=["equipes"])

# -------------------------------
# Criar equipe
# -------------------------------
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


# -------------------------------
# Listar todas as equipes
# -------------------------------
@router.get("/", response_model=list[EquipePublic])
def listar_equipes(db: Session = Depends(get_db)):
    return db.query(Equipe).all()


# -------------------------------
# Atualizar Equipe
# -------------------------------
@router.put("/{id}", response_model=EquipePublic)
def update_equipe(id: int, data: EquipeSchema, db: Session = Depends(get_db)):

    equipe = db.query(Equipe).filter(Equipe.id == id).first()

    if not equipe:
        raise HTTPException(status_code=404, detail="Equipe não encontrada")

    # Atualizar campos
    equipe.nome = data.nome
    equipe.id_pesquisador = data.id_pesquisador

    db.commit()
    db.refresh(equipe)

    return EquipePublic(
        id=equipe.id,
        nome=equipe.nome,
        id_pesquisador=equipe.id_pesquisador
    )


# -------------------------------
# Deletar equipe
# -------------------------------
@router.delete("/{id}", response_model=bool)
def delete_equipe(id: int, db: Session = Depends(get_db)):

    equipe = db.query(Equipe).filter(
        Equipe.id == id
    ).first()

    if not equipe:
        raise HTTPException(status_code=404, detail="Bairro não encontrado")

    db.delete(equipe)
    db.commit()

    return True