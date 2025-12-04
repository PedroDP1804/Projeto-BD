from http import HTTPStatus
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import base64

from naep.dependencies import get_db
from naep.models import Pesquisador, TelefonePesquisador
from naep.schemas.pesquisador_schema import (
    PesquisadorSchema,
    PesquisadorPublic,
)
from naep.schemas.schemas import Message

# Função auxiliar para limpar o header do base64 vindo do front
def processar_base64(base64_string: str | None) -> bytes | None:
    if not base64_string:
        return None
    # Se vier com o prefixo "data:image...", removemos
    if "," in base64_string:
        base64_string = base64_string.split(",")[1]
    return base64.b64decode(base64_string)

router = APIRouter(prefix="/pesquisadores", tags=["pesquisadores"])

# Função auxiliar para converter bytes do banco para string pro front
def converter_bytes_para_base64(dados_bytes: bytes | None) -> str | None:
    if not dados_bytes:
        return None
    
    # Converte bytes -> string base64
    base64_str = base64.b64encode(dados_bytes).decode('utf-8')
    
    # Detecção simples de assinatura (Magic Numbers)
    mime_type = "image/jpeg" # Padrão
    
    # A assinatura de um PNG sempre começa com esses bytes
    if dados_bytes.startswith(b"\x89PNG\r\n\x1a\n"):
        mime_type = "image/png"
    # A assinatura de um JPEG sempre começa com \xff\xd8
    elif dados_bytes.startswith(b"\xff\xd8"):
        mime_type = "image/jpeg"
    # GIF (caso queira suportar no futuro) começa com GIF87a ou GIF89a
    elif dados_bytes.startswith(b"GIF8"):
        mime_type = "image/gif"

    # Retorna com o mime type correto
    return f"data:{mime_type};base64,{base64_str}"


# -------------------------------
# Criar pesquisador
# -------------------------------
@router.post("/", response_model=PesquisadorPublic, status_code=HTTPStatus.CREATED)
def create_pesquisador(data: PesquisadorSchema, db: Session = Depends(get_db)):

    foto_em_bytes = processar_base64(data.foto_base64)
    
    novo = Pesquisador(
        nome=data.nome,
        foto=foto_em_bytes,
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
        id=novo.id,
        nome=novo.nome,
        foto_base64=data.foto_base64,
        email=novo.email,
        cpf=novo.cpf,
        data_nascimento=novo.data_nascimento,
        status=novo.status,
        telefones=telefones
    )

# -------------------------------
# Listar todos os pesquisadores
# -------------------------------
@router.get("/", response_model=List[PesquisadorPublic])
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

        foto_base64 = converter_bytes_para_base64(p.foto)

        resultado.append(PesquisadorPublic(
            id=p.id,
            nome=p.nome,
            foto_base64=foto_base64,
            email=p.email,
            cpf=p.cpf,
            data_nascimento=p.data_nascimento,
            status=p.status,
            telefones=tels
        ))

    return resultado


# -------------------------------
# Atualizar pesquisador
# -------------------------------
@router.put("/{id}", response_model=PesquisadorPublic)
def update_pesquisador(id: int, data: PesquisadorSchema, db: Session = Depends(get_db)):

    foto_em_bytes = processar_base64(data.foto_base64)

    p = db.query(Pesquisador).filter(Pesquisador.id == id).first()

    if not p:
        raise HTTPException(status_code=404, detail="Pesquisador não encontrado")

    # Atualizar campos
    p.nome = data.nome
    p.foto = foto_em_bytes
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
        foto=data.foto_base64,
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
