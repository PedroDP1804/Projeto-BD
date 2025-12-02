from fastapi import FastAPI

from naep.routers import (
    bairro_router,
    equipe_router,
    pesquisador_router,
    pesquisas_router,
    status_pesquisa_router,
    tipo_lixo_router,
)

app = FastAPI(
    title="API do Sistema Integrado de Gestão e Pesquisa do NAEP",
    description="API para gerenciar o processo de pesquisas e controle de lixo do NAEP",
    version="1.1.0"
)


app.include_router(pesquisador_router.router)
app.include_router(pesquisas_router.router)
app.include_router(equipe_router.router)
app.include_router(bairro_router.router)
app.include_router(tipo_lixo_router.router)
app.include_router(status_pesquisa_router.router)


@app.get("/", tags=["Root"])
def read_root():
    return {"status": "API do Sistema do NAEP"}
