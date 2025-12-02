from naep.models.models import table_registry

from .database import engine

print("Criando tabelas...")
table_registry.metadata.create_all(bind=engine)
print("Tabelas criadas!")
