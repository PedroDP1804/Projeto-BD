# naep/routers/pesquisador_router.py

from http import HTTPStatus
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from naep.dependencies import get_db
from naep.models import Pesquisador, TelefonePesquisador
from naep.schemas.pesquisador_schema import (
    PesquisadorSchema,
    PesquisadorPublic,
    PesquisadorList,
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
        data_nasc=data.data_nasc,
        endereco=data.endereco,
        estado=data.estado,
        cidade=data.cidade,
        rua=data.rua,
    )

    db.add(novo)
    db.commit()
    db.refresh(novo)

    # Inserir telefones
    for tel in data.telefones:
        db.add(
            TelefonePesquisador(
                id_pesquisador=novo.id_pesquisador,
                telefone=tel
            )
        )

    db.commit()

    # Montar retorno com telefones
    telefones = [
        t.telefone
        for t in db.query(TelefonePesquisador)
        .filter(TelefonePesquisador.id_pesquisador == novo.id_pesquisador)
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
            .filter(TelefonePesquisador.id_pesquisador == p.id_pesquisador)
            .all()
        ]

        resultado.append(PesquisadorPublic(**p.__dict__, telefones=tels))

    return {"pesquisadores": resultado}


# -------------------------------
# Buscar por ID
# -------------------------------
@router.get("/{pesquisador_id}", response_model=PesquisadorPublic)
def get_pesquisador(pesquisador_id: int, db: Session = Depends(get_db)):

    p = db.query(Pesquisador).filter(Pesquisador.id_pesquisador == pesquisador_id).first()

    if not p:
        raise HTTPException(status_code=404, detail="Pesquisador não encontrado")

    telefones = [
        t.telefone
        for t in db.query(TelefonePesquisador)
        .filter(TelefonePesquisador.id_pesquisador == pesquisador_id)
        .all()
    ]

    return PesquisadorPublic(**p.__dict__, telefones=telefones)


# -------------------------------
# Atualizar pesquisador
# -------------------------------
@router.put("/{pesquisador_id}", response_model=PesquisadorPublic)
def update_pesquisador(pesquisador_id: int, data: PesquisadorSchema, db: Session = Depends(get_db)):

    p = db.query(Pesquisador).filter(Pesquisador.id_pesquisador == pesquisador_id).first()

    if not p:
        raise HTTPException(status_code=404, detail="Pesquisador não encontrado")

    # Atualizar campos
    p.nome = data.nome
    p.email = data.email
    p.cpf = data.cpf
    p.data_nasc = data.data_nasc
    p.endereco = data.endereco
    p.estado = data.estado
    p.cidade = data.cidade
    p.rua = data.rua

    db.commit()

    # Remover telefones antigos
    db.query(TelefonePesquisador).filter(
        TelefonePesquisador.id_pesquisador == pesquisador_id
    ).delete()

    # Inserir telefones novos
    for tel in data.telefones:
        db.add(
            TelefonePesquisador(
                id_pesquisador=pesquisador_id,
                telefone=tel,
            )
        )

    db.commit()

    return PesquisadorPublic(**p.__dict__, telefones=data.telefones)


# -------------------------------
# Deletar pesquisador
# -------------------------------
@router.delete("/{pesquisador_id}", response_model=Message)
def delete_pesquisador(pesquisador_id: int, db: Session = Depends(get_db)):

    p = db.query(Pesquisador).filter(
        Pesquisador.id_pesquisador == pesquisador_id
    ).first()

    if not p:
        raise HTTPException(status_code=404, detail="Pesquisador não encontrado")

    # Telefones têm DELETE CASCADE, mas apagamos manualmente para garantir
    db.query(TelefonePesquisador).filter(
        TelefonePesquisador.id_pesquisador == pesquisador_id
    ).delete()

    db.delete(p)
    db.commit()

    return {"message": "Pesquisador deletado"}
