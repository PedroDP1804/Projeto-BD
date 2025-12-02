# CRUD - Equipe


from http import HTTPStatus

from fastapi import APIRouter, HTTPException

from naep.schemas.equipe_schema import (
    EquipeDB,
    EquipeList,
    EquipePublic,
    EquipeSchema,
)

db_equipes = []

router = APIRouter(prefix='/equipes', tags=['equipes'])


@router.post(
    '/',
    status_code=HTTPStatus.CREATED,
    response_model=EquipePublic,
)
def create_equipe(equipe: EquipeSchema):
    equipe_with_id = EquipeDB(id=len(db_equipes) + 1, **equipe.model_dump())

    db_equipes.append(equipe_with_id)
    return equipe_with_id


@router.get('/', response_model=EquipeList)
def read_equipes():
    return {'equipes': db_equipes}


@router.get(
    '/equipes/{equipe_id}',
    status_code=HTTPStatus.OK,
    response_model=EquipePublic,
)
def read_equipe_by_id(equipe_id: int):
    if equipe_id > len(db_equipes) or equipe_id < 1:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND, detail='Equipe not found'
        )

    return db_equipes[equipe_id - 1]


@router.put('/equipes/{equipe_id}', response_model=EquipePublic)
def update_equipe(equipe_id: int, equipe: EquipeSchema):
    if equipe_id > len(db_equipes) or equipe_id < 1:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='Equipe not found',
        )

    equipe_with_id = EquipeDB(**equipe.model_dump(), id=equipe_id)
    db_equipes[equipe_id - 1] = equipe_with_id

    return equipe_with_id
