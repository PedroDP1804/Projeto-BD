from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from naep.routers import (
    bairro_router,
    equipe_router,
    pesquisador_router,
    pesquisas_router,
    status_pesquisa_router,
    unidade_tratamento_router,
    tipo_unidade_router
)

app = FastAPI(
    title="API do Sistema Integrado de Gestão e Pesquisa do NAEP",
    description="API para gerenciar o processo de pesquisas e controle de lixo do NAEP",
    version="1.1.0"
)

origins = [
    "http://localhost:3000", # Endereço do seu Front-end
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pesquisador_router.router)
app.include_router(pesquisas_router.router)
app.include_router(equipe_router.router)
app.include_router(bairro_router.router)
app.include_router(tipo_unidade_router.router)
app.include_router(status_pesquisa_router.router)
app.include_router(unidade_tratamento_router.router)


@app.get("/", tags=["Root"])
def read_root():
    return {"status": "API do Sistema do NAEP"}
