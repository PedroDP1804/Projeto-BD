"use client"

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Equipe, Frequencia, Pesquisa, StatusPesquisa } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

interface FormPesquisaProps {
    tipo: "criar" | "editar";
    equipes: Equipe[];
    frequencias: Frequencia[];
    listaStatus: StatusPesquisa[];
    id_editar?: number;
    default_value?: Partial<Pesquisa>;
}

export function FormPesquisa({ tipo, equipes, frequencias, listaStatus, id_editar, default_value }: FormPesquisaProps) {

    const router = useRouter();

    // Helper para converter Date em string "YYYY-MM-DD" para o input type="date"
    const dateToInput = (date?: Date) => {
        if (!date) return "";
        return date.toISOString().split('T')[0];
    };

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form_data = new FormData(event.currentTarget);

        // Conversão dos inputs de data string para objeto Date
        const dataInicioStr = form_data.get("data_inicio") as string;
        const dataFimStr = form_data.get("data_fim") as string;

        // Construção do objeto Pesquisa
        // Nota: Ajustamos o fuso horário adicionando 'T12:00:00' para evitar problemas de dia anterior ao usar new Date() direto
        const data: Pesquisa = {
            id_pesquisa: id_editar,
            descricao: form_data.get("descricao") as string,
            data_inicio: new Date(dataInicioStr + 'T12:00:00'), 
            data_fim: new Date(dataFimStr + 'T12:00:00'),
            frequencia: frequencias.find(f => f.id === Number(form_data.get("id_frequencia")))!,
            status_pesquisa: listaStatus.find(s => s.id_status_pesquisa === Number(form_data.get("id_status")))!,
            equipe: equipes.find(e => e.id === Number(form_data.get("id_equipe")))!,
        };

        let ok = false;

        if (tipo === "criar") {
            // ##----------------------------------------------------##
            //  Inserir aqui a chamada de API pra CRIAR
                // await funcaoAPI(data)
                ok = true
                alert(JSON.stringify(data))
                // alert(data.data_nascimento.toLocaleDateString("pt-br"))
            // ##----------------------------------------------------##
        }

        if (tipo === "editar") {
            // ##----------------------------------------------------##
            //  Inserir aqui a chamada de API pra EDITAR
                // await funcaoAPI(data)
                ok = true
                alert(JSON.stringify(data))
                // alert(data.data_nascimento.toLocaleDateString("pt-br"))
            // ##----------------------------------------------------##
        }

        if (ok) {
            alert(`Pesquisa ${tipo === "criar" ? "criada" : "atualizada"} com sucesso!`);
            router.refresh();
        } else {
            alert("Erro ao salvar.");
        }
    }

    return (
        <DialogContent className="max-w-3xl">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-700">
                    {tipo === "criar" ? "Nova Pesquisa" : "Editar Pesquisa"}
                </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-4">

                {/* Descrição (Full width) */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                    <input
                        type="text"
                        name="descricao"
                        defaultValue={default_value?.descricao}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-azul-sidebar"
                        placeholder="Ex: Análise da qualidade da água"
                        required
                    />
                </div>

                {/* Data Início */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data Início</label>
                    <input
                        type="date"
                        name="data_inicio"
                        defaultValue={dateToInput(default_value?.data_inicio)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />
                </div>

                {/* Data Fim */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data Fim</label>
                    <input
                        type="date"
                        name="data_fim"
                        defaultValue={dateToInput(default_value?.data_fim)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />
                </div>

                {/* Frequência */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Frequência</label>
                    <select
                        name="id_frequencia"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                        defaultValue={default_value?.frequencia?.id ?? ""}
                        required
                    >
                        <option value="" disabled>-- Selecione --</option>
                        {frequencias.map(f => (
                            <option key={f.id} value={f.id}>{f.periodo}</option>
                        ))}
                    </select>
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        name="id_status"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                        defaultValue={default_value?.status_pesquisa?.id_status_pesquisa ?? ""}
                        required
                    >
                        <option value="" disabled>-- Selecione --</option>
                        {listaStatus.map(s => (
                            <option key={s.id_status_pesquisa} value={s.id_status_pesquisa}>{s.status}</option>
                        ))}
                    </select>
                </div>

                {/* Equipe */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Equipe Responsável</label>
                    <select
                        name="id_equipe"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                        defaultValue={default_value?.equipe?.id ?? ""}
                        required
                    >
                        <option value="" disabled>-- Selecione a Equipe --</option>
                        {equipes.map(e => (
                            <option key={e.id} value={e.id}>{e.nome}</option>
                        ))}
                    </select>
                </div>

                {/* Botão Salvar */}
                <div className="w-full flex justify-center mt-8">
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