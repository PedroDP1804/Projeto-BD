from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError

from dotenv import load_dotenv
from os import getenv

load_dotenv("naep/.env")
db_url = getenv("DATABASE_URL")


file = open('seed.sql', 'r')
query = file.read()
file.close() 

def execute_sql_script():
    # Cria a engine de conexão
    engine = create_engine(db_url)

    print("--- Iniciando execução do SQL ---")
    
    try:
        # Abre a conexão
        with engine.connect() as connection:
            
            # Prepara o comando SQL
            statement = text(query)
            
            # Executa
            result = connection.execute(statement)
            
            # Confirma as alterações (COMMIT)
            # Obrigatório para INSERT, UPDATE, DELETE, etc.
            connection.commit()
            
            print("✅ Sucesso! Comando executado.")

    except SQLAlchemyError as e:
        print(f"❌ Erro ao executar SQL:\n{str(e)[1:1000]}...")
        # O rollback é automático quando ocorre exceção no contexto do 'with'

if __name__ == "__main__":
    execute_sql_script()