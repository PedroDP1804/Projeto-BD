from datetime import date
from typing import Optional

from sqlalchemy import Date, Float, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_as_dataclass, mapped_column, registry

table_registry = registry()


@mapped_as_dataclass(table_registry)
class Pesquisador:
    __tablename__ = "pesquisador"

    id_pesquisador: Mapped[int] = mapped_column(init=False, primary_key=True)
    nome: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    email: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    cpf: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    data_nasc: Mapped[Optional[date]] = mapped_column(Date, nullable=True)

    endereco: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    estado: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    cidade: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    rua: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)


@mapped_as_dataclass(table_registry)
class TelefonePesquisador:
    __tablename__ = "telefone_pesquisador"

    id_pesquisador: Mapped[int] = mapped_column(
        ForeignKey("pesquisador.id_pesquisador", ondelete="CASCADE"),
        primary_key=True
    )
    telefone: Mapped[str] = mapped_column(String(20), primary_key=True)


@mapped_as_dataclass(table_registry)
class StatusPesquisa:
    __tablename__ = "status_pesquisa"

    id_status_pesquisa: Mapped[int] = mapped_column(init=False, primary_key=True)
    status: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)


@mapped_as_dataclass(table_registry)
class Frequencia:
    __tablename__ = "frequencia"

    id_frequencia: Mapped[int] = mapped_column(init=False, primary_key=True)
    periodo: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)


@mapped_as_dataclass(table_registry)
class Pesquisa:
    __tablename__ = "pesquisa"

    id_pesquisa: Mapped[int] = mapped_column(init=False, primary_key=True)
    descricao: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    data_inicio: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    data_fim: Mapped[Optional[date]] = mapped_column(Date, nullable=True)

    id_frequencia: Mapped[int] = mapped_column(ForeignKey("frequencia.id_frequencia"))
    id_status_pesquisa: Mapped[int] = mapped_column(ForeignKey("status_pesquisa.id_status_pesquisa"))


@mapped_as_dataclass(table_registry)
class Bairro:
    __tablename__ = "bairro"

    id_bairro: Mapped[int] = mapped_column(init=False, primary_key=True)
    nome: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    id_frequencia: Mapped[int] = mapped_column(ForeignKey("frequencia.id_frequencia"))


@mapped_as_dataclass(table_registry)
class Equipe:
    __tablename__ = "equipe"

    id_equipe: Mapped[int] = mapped_column(init=False, primary_key=True)
    nome: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    id_pesquisador: Mapped[int] = mapped_column(ForeignKey("pesquisador.id_pesquisador"))


@mapped_as_dataclass(table_registry)
class TipoUnidadeTratamento:
    __tablename__ = "tipo_unidade_tratamento"

    id_tipo_uni_tratamento: Mapped[int] = mapped_column(init=False, primary_key=True)
    tipo: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)


@mapped_as_dataclass(table_registry)
class UnidadeTratamento:
    __tablename__ = "unidade_tratamento"

    id_unidade_tratamento: Mapped[int] = mapped_column(init=False, primary_key=True)
    nome: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    id_tipo_uni_tratamento: Mapped[int] = mapped_column(ForeignKey("tipo_unidade_tratamento.id_tipo_uni_tratamento"))

    endereco: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    estado: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    cidade: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    rua: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)


@mapped_as_dataclass(table_registry)
class Coleta:
    __tablename__ = "coleta"

    id_coleta: Mapped[int] = mapped_column(init=False, primary_key=True)
    descricao: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    quantidade_kg: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    categoria: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)

    id_bairro: Mapped[int] = mapped_column(ForeignKey("bairro.id_bairro"))
    id_unidade_tratamento: Mapped[int] = mapped_column(ForeignKey("unidade_tratamento.id_unidade_tratamento"))
