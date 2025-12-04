"use client";

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { TipoUnidade, Unidade } from "@/lib/interfaces";
import { createUnidade, updateUnidade } from "@/services/api_unidade";

interface Props {
    tipo: "criar" | "editar";
    id_editar?: number;
    default_value?: Partial<Unidade>;
    tipos_unidade: TipoUnidade[];
}

export function FormUnidade({ tipo, id_editar, default_value, tipos_unidade }: Props) {

    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form_data = new FormData(event.currentTarget);

        const data:Unidade = {
            id: id_editar,
            nome: form_data.get("nome") as string,
            endereco: form_data.get("endereco") as string,
            estado: form_data.get("estado") as string,
            cidade: form_data.get("cidade") as string,
            rua: form_data.get("rua") as string,
            id_tipo_unidade: Number(form_data.get("id_tipo") as string)
        };

        let ok = false
        
        // Chamada da API Create
        if (tipo === "criar") {
            const result = await createUnidade(data)
            ok = !!result
        }

        // Chamada da API Edit
        if (tipo === "editar") {
            if (!data.id) {
                alert("Id inváido")
                return
            }
            
            const result = await updateUnidade(data.id, data)
            ok = !!result
        }

        if (ok) {
            alert(`Unidade ${tipo === "criar" ? "criada" : "editada"} com sucesso`);
            router.refresh();
        } else {
            alert(`Erro ao ${tipo}`);
        }
    }

    return (
        <DialogContent>

            <DialogHeader>
                <DialogTitle className="text-2xl">
                    {tipo === "criar" ? "Adicionar" : "Editar"} Unidade
                </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Nome */}
                <div>
                    <h2>Nome</h2>
                    <input
                        name="nome"
                        defaultValue={default_value?.nome}
                        required
                        className="border px-3 py-2 rounded-md w-full"
                    />
                </div>

                {/* Tipo */}
                <div>
                    <h2>Tipo</h2>
                    <div className="flex gap-3 items-center">

                        <select
                            name="id_tipo"
                            className="border px-3 py-2 rounded-md w-full"
                            defaultValue={default_value?.id_tipo_unidade ?? ""}
                            required
                        >
                            <option disabled value="">-- Selecione um Tipo --</option>
                            {tipos_unidade.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.tipo}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>

                {/* Endereço */}
                <div>
                    <h2>Endereço</h2>
                    <input
                        name="endereco"
                        defaultValue={default_value?.endereco}
                        required
                        className="border px-3 py-2 rounded-md w-full"
                    />
                </div>

                {/* Estado */}
                <div>
                    <h2>Estado</h2>
                    <input
                        name="estado"
                        defaultValue={default_value?.estado}
                        required
                        className="border px-3 py-2 rounded-md w-full"
                    />
                </div>

                {/* Cidade */}
                <div>
                    <h2>Cidade</h2>
                    <input
                        name="cidade"
                        defaultValue={default_value?.cidade}
                        required
                        className="border px-3 py-2 rounded-md w-full"
                    />
                </div>

                {/* Rua */}
                <div>
                    <h2>Rua</h2>
                    <input
                        name="rua"
                        defaultValue={default_value?.rua}
                        required
                        className="border px-3 py-2 rounded-md w-full"
                    />
                </div>

                {/* Botão */}
                <div className="w-full flex justify-center mt-4">
                    <button
                        type="submit"
                        className="text-white font-bold w-40 cursor-pointer bg-azul-sidebar rounded-md py-2 px-5 h-max"
                    >
                        Salvar
                    </button>
                </div>

            </form>

        </DialogContent>
    );
}
