This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Banco de Dados
Configure e inicie o banco de dados PostgreSQL, da forma que preferir, e então atualize DATABASE_URL em /back/naep/.env

Para resetar o banco de dados, execute em `/back/` :

```
python seed.py
```


## API
API em fastapi e sqlalchemy em `back/naep/`
Para executar, siga os passos a seguir em `/back/naep/`

* Instale os requisitos com:

```
python -m pip install -r requirements.txt
```

*  Depois execute a API com:

```
python -m uvicorn naep.app:app --reload
```