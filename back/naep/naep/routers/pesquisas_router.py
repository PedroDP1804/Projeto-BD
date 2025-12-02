# CRUD - Pesquisa
from http import HTTPStatus
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from naep.dependencies import get_db
from naep.models import (
    Pesquisa,  # Certifique-se de que o model Pesquisa existe em naep.models
)
from naep.schemas.pesquisa_schema import (
    PesquisaPublic,
    PesquisaSchema,
)
from naep.schemas.schemas import Message

router = APIRouter(prefix="/pesquisas", tags=["pesquisas"])


# CREATE --------------------------------------------------

@router.post(
    "/",
    status_code=HTTPStatus.CREATED,
    response_model=PesquisaPublic,
)
def create_pesquisa(pesquisa: PesquisaSchema, db: Session = Depends(get_db)):
    # Cria a instância do modelo SQLAlchemy com os dados do schema
    # O model_dump() desempacota os campos do Pydantic para o construtor do Model
    nova_pesquisa = Pesquisa(**pesquisa.model_dump())

    # Nota: A validação de chaves estrangeiras (frequencia, status, equipe)
    # agora é feita automaticamente pelo Banco de Dados.
    # Se um ID não existir, o SQLAlchemy lançará um erro de integridade.

    db.add(nova_pesquisa)
    db.commit()
    db.refresh(nova_pesquisa)

    return nova_pesquisa


# READ ALL --------------------------------------------------

@router.get("/", response_model=List[PesquisaPublic])
def listar_pesquisas(db: Session = Depends(get_db)):
    # Retorna todas as pesquisas diretamente do banco
    return db.query(Pesquisa).all()


# READ BY ID ------------------------------------------------

@router.get(
    "/{pesquisa_id}",
    response_model=PesquisaPublic,
    status_code=HTTPStatus.OK,
)
def read_pesquisa_by_id(pesquisa_id: int, db: Session = Depends(get_db)):
    # Busca a pesquisa pelo ID (assumindo que a coluna no model se chama id_pesquisa)
    pesquisa_db = db.query(Pesquisa).filter(Pesquisa.id_pesquisa == pesquisa_id).first()

    if not pesquisa_db:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail="Pesquisa não encontrada",
        )

    return pesquisa_db


# UPDATE ----------------------------------------------------

@router.put(
    "/{pesquisa_id}",
    response_model=PesquisaPublic,
)
def update_pesquisa(
    pesquisa_id: int,
    pesquisa_atualizada: PesquisaSchema,
    db: Session = Depends(get_db)
):
    # Verifica se existe
    pesquisa_db = db.query(Pesquisa).filter(Pesquisa.id_pesquisa == pesquisa_id).first()

    if not pesquisa_db:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail="Pesquisa não encontrada",
        )

    # Atualiza os campos do objeto recuperado do banco
    for key, value in pesquisa_atualizada.model_dump().items():
        setattr(pesquisa_db, key, value)

    db.commit()
    db.refresh(pesquisa_db)

    return pesquisa_db


# DELETE ----------------------------------------------------

@router.delete(
    "/{pesquisa_id}",
    response_model=Message,
)
def delete_pesquisa(pesquisa_id: int, db: Session = Depends(get_db)):
    # Verifica se existe
    pesquisa_db = db.query(Pesquisa).filter(Pesquisa.id_pesquisa == pesquisa_id).first()

    if not pesquisa_db:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail="Pesquisa não encontrada",
        )

    db.delete(pesquisa_db)
    db.commit()

    return {"message": "Pesquisa deletada com sucesso"}
