from .database import engine
from naep.models.models import table_registry

print("Criando tabelas...")
table_registry.metadata.create_all(bind=engine)
print("Tabelas criadas!")
