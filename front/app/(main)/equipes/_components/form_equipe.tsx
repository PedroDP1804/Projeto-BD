"use client"

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Equipe, Pesquisador } from "@/lib/interfaces";
import { createEquipe, updateEquipe } from "@/services/api_equipe";

interface FormEquipeProps {
    tipo: "criar" | "editar",
    pesquisadores: Pesquisador[],
    id_editar?: number,
    default_value?: Partial<Equipe>,
}

export function FormEquipe({ tipo, pesquisadores, id_editar, default_value }: FormEquipeProps) {

    const router = useRouter();

    async function handleSubmit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form_data = new FormData(event.currentTarget);

        const data:Equipe = {
            id: id_editar,
            nome: form_data.get("nome") as string,
            id_pesquisador: Number(form_data.get("id_pesquisador") as string)
        };

        let ok = false;

        // Chamada da API Create
        if (tipo === "criar") {
            const result = await createEquipe(data)
            ok = !!result
        }

        // Chamada da API Edit
        if (tipo === "editar") {
            if (!data.id) {
                alert("Id inváido")
                return
            }
            
            const result = await updateEquipe(data.id, data)
            ok = !!result
        }

        if (ok) {
            alert(`Equipe ${tipo === "criar" ? "criada" : "editada"} com sucesso!`);
            router.refresh();
        } else {
            alert("Erro ao salvar equipe.");
        }
    }

    return (
        <DialogContent>

            <DialogHeader>
                <DialogTitle className="text-2xl">
                    {tipo === "criar" ? "Adicionar" : "Editar"} Equipe
                </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit}>

                {/* Nome */}
                <h2 className="text-lg">Nome da Equipe</h2>
                <input
                    type="text"
                    name="nome"
                    defaultValue={default_value?.nome}
                    className="border-2 indent-2 px-2 py-3 mt-1 w-[90%] rounded-md"
                    placeholder="Nome da Equipe"
                    required={tipo === "criar"}
                />

                {/* Pesquisador Responsável */}
                <h2 className="text-lg mt-4">Pesquisador Responsável</h2>
                <div className="flex gap-3 items-center">

                    <select
                        name="id_pesquisador"
                        className="border px-3 py-2 rounded-md w-full"
                        defaultValue={default_value?.id_pesquisador ?? ""}
                        required
                    >
                        <option disabled value="">-- Selecione um Pesquisador --</option>
                        {pesquisadores.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.nome}
                            </option>
                        ))}
                    </select>

                </div>

                <div className="w-full flex justify-center mt-8">
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
