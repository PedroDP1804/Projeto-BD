"use client"

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormColeta } from "./form_coleta";
import { Bairro, Coleta, Unidade } from "@/lib/interfaces";
import { deleteColeta } from "@/services/api_coleta";

interface Props {
    coleta: Coleta;
    bairros: Bairro[];
    unidades: Unidade[];
}

export function LinhaColeta({ coleta, bairros, unidades }: Props) {

    const router = useRouter();
    
    const bairro = bairros.findLast((b)=>(b.id == coleta.id_bairro))
    const unidade = unidades.findLast((u)=>(u.id == coleta.id_unidade_tratamento))

    // Deletar coleta
    async function excluirColeta(id?: number) {

        if (!id) {
            alert("Id inválido");
            return;
        }

        let ok = false
        try {
            await deleteColeta(id)
            ok = true
        } catch (e) {
            console.error(e)
        }

        if (ok) {
            alert(`Coleta "${coleta.descricao}" (id=${id}) excluída com sucesso`);
            router.refresh();
        } else {
            alert("Erro ao excluir coleta");
        }
    }

    return (
        <TableRow className="h-16">

            <TableCell className="indent-3">{coleta.descricao}</TableCell>
            <TableCell>{coleta.quantidade_kg.toFixed(2)}</TableCell>
            <TableCell>{coleta.categoria}</TableCell>
            <TableCell>{bairro?.nome}</TableCell>
            <TableCell>{unidade?.nome}</TableCell>

            <TableCell>
                <div className="flex items-center gap-4">

                    {/* Editar */}
                    <Dialog>
                        <DialogTrigger className="cursor-pointer">
                            <SquarePen />
                        </DialogTrigger>

                        <FormColeta
                            tipo="editar"
                            bairros={bairros}
                            unidades={unidades}
                            id_editar={coleta.id}
                            default_value={coleta}
                        />
                    </Dialog>

                    {/* Excluir */}
                    <button
                        type="button"
                        onClick={() => excluirColeta(coleta.id)}
                        className="cursor-pointer"
                    >
                        <Trash2 className="text-red-500" />
                    </button>

                </div>
            </TableCell>

        </TableRow>
    );
}