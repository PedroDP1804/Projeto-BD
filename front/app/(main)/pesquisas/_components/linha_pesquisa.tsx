"use client"

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Equipe, Frequencia, Pesquisa, StatusPesquisa } from "@/lib/interfaces";
import { SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormPesquisa } from "./form_pesquisa";

interface Props {
    pesquisa: Pesquisa;
    equipes: Equipe[];
    frequencias: Frequencia[];
    listaStatus: StatusPesquisa[];
}

export function LinhaPesquisa({ pesquisa, equipes, frequencias, listaStatus }: Props) {

    const router = useRouter();

    async function deletePesquisa(id?: number) {
        if (!id) return;

        // ##----------------------------------------------------##
        //  Inserir aqui a chamada de API
        const ok = true //resultado da chamada
        
        // ##----------------------------------------------------##

        if (ok) {
            alert(`Pesquisa "${pesquisa.descricao}" removida!`);
            router.refresh();
        } else {
            alert("Erro ao excluir.");
        }
    }

    // Formata data para exibir na tabela (DD/MM/AAAA)
    const formatDate = (date: Date) => date.toLocaleDateString('pt-BR');

    return (
        <TableRow className="h-16">
            <TableCell className="indent-3">{pesquisa.descricao}</TableCell>
            <TableCell>{formatDate(pesquisa.data_inicio)}</TableCell>
            <TableCell>{formatDate(pesquisa.data_fim)}</TableCell>
            <TableCell>{pesquisa.frequencia.periodo}</TableCell>
            <TableCell>{pesquisa.status_pesquisa.status}</TableCell>
            <TableCell>{pesquisa.equipe.nome}</TableCell>

            <TableCell>
                <div className="flex items-center gap-4">
                    <Dialog>
                        <DialogTrigger className="cursor-pointer">
                            <SquarePen size={20} className="text-gray-600 hover:text-blue-600" />
                        </DialogTrigger>

                        <FormPesquisa
                            tipo="editar"
                            equipes={equipes}
                            frequencias={frequencias}
                            listaStatus={listaStatus}
                            id_editar={pesquisa.id_pesquisa}
                            default_value={pesquisa}
                        />
                    </Dialog>

                    <button type="button" onClick={() => deletePesquisa(pesquisa.id_pesquisa)}>
                        <Trash2 size={20} className="text-red-500 hover:text-red-700" />
                    </button>
                </div>
            </TableCell>
        </TableRow>
    );
}