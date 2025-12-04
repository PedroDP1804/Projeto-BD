from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from naep.dependencies import get_db
from naep.models import Frequencia, TipoUnidadeTratamento
from naep.schemas.schemas import FrequenciaPublic, TipoUnidadePublic


# -------------------------------
# -------------------------------
# -------------------------------
# SOMENTE GETS
# -------------------------------
# -------------------------------
# -------------------------------


# -------------------------------
# Frequencia
# -------------------------------
router_frequencias = APIRouter(prefix="/frequencias", tags=["frequencias"])
@router_frequencias.get("/", response_model=List[FrequenciaPublic])
def listar_frequencias(db: Session = Depends(get_db)):

    frequencias = db.query(Frequencia).all()
    resultado = []

    for f in frequencias:

        resultado.append(
            FrequenciaPublic(
                id=f.id,
                periodo=f.periodo
            )
        )

    return resultado


# -------------------------------
# Tipo Unidade de Tratamento
# -------------------------------
router_tipos = APIRouter(prefix="/tipos-unidade", tags=["tipos-unidade"])
@router_tipos.get("/", response_model=List[TipoUnidadePublic])
def listar_tipos_unidade(db: Session = Depends(get_db)):

    tipos_unidade = db.query(TipoUnidadeTratamento).all()
    resultado = []

    for t in tipos_unidade:

        resultado.append(
            TipoUnidadePublic(
                id=t.id,
                tipo=t.tipo
            )
        )

    return resultado