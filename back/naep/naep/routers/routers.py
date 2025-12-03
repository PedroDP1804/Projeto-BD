from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from naep.dependencies import get_db
from naep.models import Frequencia
from naep.schemas.schemas import FrequenciaPublic

router = APIRouter(prefix="/frequencias", tags=["frequencias"])

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
@router.get("/", response_model=List[FrequenciaPublic])
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