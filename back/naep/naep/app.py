from http import HTTPStatus

from fastapi import FastAPI, HTTPException

from naep.schemas import (
    EquipeDB,
    EquipeList,
    EquipePublic,
    EquipeSchema,
    Message,
    PesquisaDB,
    PesquisadorDB,
    PesquisadorList,
    PesquisadorPublic,
    PesquisadorSchema,
    PesquisaList,
    PesquisaPublic,
    PesquisaSchema,
)

app = FastAPI(title='NAEP - API')
db_pesquisadores = []
db_pesquisas = []
db_equipes = []


@app.get('/', status_code=HTTPStatus.OK, response_model=Message)
def read_root():
    return {'message': 'test'}


# CRUD - Pesquisas


@app.post(
    '/pesquisadores/',
    status_code=HTTPStatus.CREATED,
    response_model=PesquisadorPublic,
)
def create_pesquisador(pesquisador: PesquisadorSchema):
    pesquisador_with_id = PesquisadorDB(
        id=len(db_pesquisadores) + 1, **pesquisador.model_dump()
    )

    db_pesquisadores.append(pesquisador_with_id)
    return pesquisador_with_id


@app.get('/pesquisadores/', response_model=PesquisadorList)
def read_pesquisadores():
    return {'pesquisadores': db_pesquisadores}


@app.get(
    '/pesquisadores/{pesquisador_id}',
    status_code=HTTPStatus.OK,
    response_model=PesquisadorPublic,
)
def read_pesquisador_by_id(pesquisador_id: int):
    if pesquisador_id > len(db_pesquisadores) or pesquisador_id < 1:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND, detail='Pesquisador not found'
        )

    return db_pesquisadores[pesquisador_id - 1]


@app.put('/pesquisadores/{pesquisador_id}', response_model=PesquisadorPublic)
def update_pesquisador(pesquisador_id: int, pesquisador: PesquisadorSchema):
    if pesquisador_id > len(db_pesquisadores) or pesquisador_id < 1:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='Pesquisador not found',
        )

    pesquisador_with_id = PesquisadorDB(
        **pesquisador.model_dump(), id=pesquisador_id
    )
    db_pesquisadores[pesquisador_id - 1] = pesquisador_with_id

    return pesquisador_with_id


@app.delete('/pesquisadores/{pesquisador_id}', response_model=Message)
def delete_pesquisador(pesquisador_id: int):
    if pesquisador_id > len(db_pesquisadores) or pesquisador_id < 1:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND, detail='Pesquisa not found'
        )

    del db_pesquisadores[pesquisador_id - 1]

    return {'message': 'Pesquisador deleted'}


# CRUD - Pesquisas


@app.post(
    '/pesquisas/',
    status_code=HTTPStatus.CREATED,
    response_model=PesquisaPublic,
)
def create_pesquisa(pesquisa: PesquisaSchema):
    if (
        pesquisa.id_pesquisador_responsavel > len(db_pesquisadores)
        or pesquisa.id_pesquisador_responsavel < 1
    ):
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail='Pesquisador ID invalid',
        )

    pesquisa_with_id = PesquisaDB(
        id=len(db_pesquisas) + 1, **pesquisa.model_dump()
    )

    db_pesquisas.append(pesquisa_with_id)
    return pesquisa_with_id


@app.get('/pesquisas/', response_model=PesquisaList)
def read_pesquisas():
    return {'pesquisas': db_pesquisas}


@app.put('/pesquisas/{pesquisa_id}', response_model=PesquisaPublic)
def update_pesquisa(pesquisa_id: int, pesquisa: PesquisaSchema):
    if pesquisa_id > len(db_pesquisas) or pesquisa_id < 1:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND, detail='Pesquisa not found'
        )

    pesquisa_with_id = PesquisaDB(**pesquisa.model_dump(), id=pesquisa_id)
    db_pesquisas[pesquisa_id - 1] = pesquisa_with_id

    return pesquisa_with_id


@app.delete('/pesquisas/{pesquisa_id}', response_model=Message)
def delete_pesquisa(pesquisa_id: int):
    if pesquisa_id > len(db_pesquisas) or pesquisa_id < 1:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND, detail='Pesquisa not found'
        )

    del db_pesquisas[pesquisa_id - 1]

    return {'message': 'Pesquisa deleted'}


# CRUD - Equipe


@app.post(
    '/equipes/',
    status_code=HTTPStatus.CREATED,
    response_model=EquipePublic,
)
def create_equipe(equipe: EquipeSchema):
    equipe_with_id = EquipeDB(id=len(db_equipes) + 1, **equipe.model_dump())

    db_equipes.append(equipe_with_id)
    return equipe_with_id


@app.get('/equipes/', response_model=EquipeList)
def read_equipes():
    return {'equipes': db_equipes}


@app.get(
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


@app.put('/equipes/{equipe_id}', response_model=EquipePublic)
def update_equipe(equipe_id: int, equipe: EquipeSchema):
    if equipe_id > len(db_equipes) or equipe_id < 1:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='Equipe not found',
        )

    equipe_with_id = EquipeDB(**equipe.model_dump(), id=equipe_id)
    db_equipes[equipe_id - 1] = equipe_with_id

    return equipe_with_id
