# naep/routers/pesquisador_router.py

from http import HTTPStatus

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from naep.dependencies import get_db
from naep.models import Pesquisador, TelefonePesquisador
from naep.schemas.pesquisador_schema import (
    PesquisadorList,
    PesquisadorPublic,
    PesquisadorSchema,
)
from naep.schemas.schemas import Message

router = APIRouter(prefix="/pesquisadores", tags=["pesquisadores"])


# -------------------------------
# Criar pesquisador
# -------------------------------
@router.post("/", response_model=PesquisadorPublic, status_code=HTTPStatus.CREATED)
def create_pesquisador(data: PesquisadorSchema, db: Session = Depends(get_db)):

    novo = Pesquisador(
        nome=data.nome,
        email=data.email,
        cpf=data.cpf,
        data_nascimento=data.data_nascimento,
        status=data.status,
    )

    db.add(novo)
    db.commit()
    db.refresh(novo)

    # Inserir telefones
    for tel in data.telefones:
        db.add(
            TelefonePesquisador(
                id_pesquisador=novo.id,
                telefone=tel
            )
        )

    db.commit()

    # Montar retorno com telefones
    telefones = [
        t.telefone
        for t in db.query(TelefonePesquisador)
        .filter(TelefonePesquisador.id_pesquisador == novo.id)
        .all()
    ]

    return PesquisadorPublic(
        **novo.__dict__,
        telefones=telefones
    )


# -------------------------------
# Listar todos os pesquisadores
# -------------------------------
@router.get("/", response_model=PesquisadorList)
def listar_pesquisadores(db: Session = Depends(get_db)):

    pesquisadores = db.query(Pesquisador).all()
    resultado = []

    for p in pesquisadores:
        tels = [
            t.telefone
            for t in db.query(TelefonePesquisador)
            .filter(TelefonePesquisador.id_pesquisador == p.id)
            .all()
        ]

        resultado.append(PesquisadorPublic(**p.__dict__, telefones=tels))

    return {"pesquisadores": resultado}


# -------------------------------
# Atualizar pesquisador
# -------------------------------
@router.put("/{id}", response_model=PesquisadorPublic)
def update_pesquisador(id: int, data: PesquisadorSchema, db: Session = Depends(get_db)):

    p = db.query(Pesquisador).filter(Pesquisador.id == id).first()

    if not p:
        raise HTTPException(status_code=404, detail="Pesquisador não encontrado")

    # Atualizar campos
    p.nome = data.nome
    p.email = data.email
    p.cpf = data.cpf
    p.data_nascimento = data.data_nascimento

    db.commit()
    db.refresh(p)

    # Remover telefones antigos
    db.query(TelefonePesquisador).filter(
        TelefonePesquisador.id_pesquisador == id
    ).delete()

    # Inserir telefones novos
    for tel in data.telefones:
        db.add(
            TelefonePesquisador(
                id_pesquisador=id,
                telefone=tel,
            )
        )

    db.commit()

    return PesquisadorPublic(
        id=p.id,
        nome=p.nome,
        email=p.email,
        cpf=p.cpf,
        data_nascimento=p.data_nascimento,
        status=p.status,
        telefones=data.telefones
    )


# -------------------------------
# Deletar pesquisador
# -------------------------------
@router.delete("/{id}", response_model=Message)
def delete_pesquisador(id: int, db: Session = Depends(get_db)):

    p = db.query(Pesquisador).filter(
        Pesquisador.id == id
    ).first()

    if not p:
        raise HTTPException(status_code=404, detail="Pesquisador não encontrado")

    # Telefones têm DELETE CASCADE, mas apagamos manualmente para garantir
    db.query(TelefonePesquisador).filter(
        TelefonePesquisador.id_pesquisador == id
    ).delete()

    db.delete(p)
    db.commit()

    return {"message": "Pesquisador deletado"}
