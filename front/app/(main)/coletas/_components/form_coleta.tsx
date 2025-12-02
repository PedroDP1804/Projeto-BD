"use client"

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bairro, Coleta, Unidade } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

interface FormColetaProps {
    tipo: "criar" | "editar";
    bairros: Bairro[];
    unidades: Unidade[];
    id_editar?: number;
    default_value?: Partial<Coleta>;
}

export function FormColeta({ tipo, bairros, unidades, id_editar, default_value }: FormColetaProps) {

    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form_data = new FormData(event.currentTarget);

        // Monta o objeto Coleta com base nos IDs selecionados
        const data: Coleta = {
            id_coleta: id_editar,
            descricao: form_data.get("descricao") as string,
            quantidade_kg: Number(form_data.get("quantidade_kg")),
            categoria: form_data.get("categoria") as string,
            // Encontra o objeto bairro completo com base no ID selecionado
            bairro: bairros.filter((b) => (b.id_bairro === Number(form_data.get("id_bairro"))))[0],
            // Encontra o objeto unidade completo com base no ID selecionado
            unidade_tratamento: unidades.filter((u) => (u.id_unidade === Number(form_data.get("id_unidade_tratamento"))))[0],
        };

        let result = false;

        if (tipo === "criar") {
            // ##----------------------------------------------------##
            //  Inserir aqui a chamada de API pra CRIAR
            result = true;
            console.log("Criando:", data); // Apenas para debug
            alert(JSON.stringify(data));
            // ##----------------------------------------------------##
        }

        if (tipo === "editar") {
            // ##----------------------------------------------------##
            //  Inserir aqui a chamada de API pra EDITAR
            result = true;
            console.log("Editando:", data); // Apenas para debug
            alert(JSON.stringify(data));
            // ##----------------------------------------------------##
        }

        if (result) {
            alert(`Coleta ${tipo === "criar" ? "criada" : "editada"} com sucesso!`);
            router.refresh();
        } else {
            alert("Erro ao salvar coleta.");
        }
    }

    return (
        <DialogContent className="max-w-2xl"> {/* Aumentei um pouco a largura pois tem mais campos */}

            <DialogHeader>
                <DialogTitle className="text-2xl">
                    {tipo === "criar" ? "Adicionar" : "Editar"} Coleta
                </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

                {/* Descrição (Ocupa as 2 colunas) */}
                <div className="col-span-2">
                    <h2 className="text-lg">Descrição</h2>
                    <input
                        type="text"
                        name="descricao"
                        defaultValue={default_value?.descricao}
                        className="border-2 indent-2 px-2 py-3 mt-1 w-full rounded-md"
                        placeholder="Ex: Coleta Seletiva Rua A"
                        required
                    />
                </div>

                {/* Quantidade Kg */}
                <div>
                    <h2 className="text-lg">Quantidade (Kg)</h2>
                    <input
                        type="number"
                        step="0.01"
                        name="quantidade_kg"
                        defaultValue={default_value?.quantidade_kg}
                        className="border-2 indent-2 px-2 py-3 mt-1 w-full rounded-md"
                        placeholder="0.00"
                        required
                    />
                </div>

                {/* Categoria */}
                <div>
                    <h2 className="text-lg">Categoria</h2>
                    <select
                        name="categoria"
                        className="border-2 px-2 py-3 mt-1 w-full rounded-md bg-white"
                        defaultValue={default_value?.categoria ?? ""}
                        required
                    >
                        <option value="" disabled>-- Selecione --</option>
                        <option value="Reciclável">Reciclável</option>
                        <option value="Orgânico">Orgânico</option>
                        <option value="Hospitalar">Hospitalar</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Eletrônico">Eletrônico</option>
                    </select>
                </div>

                {/* Bairro */}
                <div>
                    <h2 className="text-lg">Bairro</h2>
                    <select
                        name="id_bairro"
                        className="border-2 px-2 py-3 mt-1 w-full rounded-md bg-white"
                        defaultValue={default_value?.bairro?.id_bairro ?? ""}
                        required
                    >
                        <option disabled value="">-- Selecione o Bairro --</option>
                        {bairros.map((b) => (
                            <option key={b.id_bairro} value={b.id_bairro}>
                                {b.nome}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Unidade de Tratamento */}
                <div>
                    <h2 className="text-lg">Unidade de Tratamento</h2>
                    <select
                        name="id_unidade_tratamento"
                        className="border-2 px-2 py-3 mt-1 w-full rounded-md bg-white"
                        defaultValue={default_value?.unidade_tratamento?.id_unidade ?? ""}
                        required
                    >
                        <option disabled value="">-- Selecione a Unidade --</option>
                        {unidades.map((u) => (
                            <option key={u.id_unidade} value={u.id_unidade}>
                                {u.nome}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Botão Salvar (Ocupa as 2 colunas) */}
                <div className="col-span-2 flex justify-center mt-6">
                    <button
                        type="submit"
                        className="text-white font-bold w-40 cursor-pointer bg-azul-sidebar rounded-md py-2 px-5"
                    >
                        Salvar
                    </button>
                </div>

            </form>

        </DialogContent>
    );
}