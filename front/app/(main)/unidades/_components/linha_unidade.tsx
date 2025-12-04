"use client";

import { TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormUnidade } from "./form_unidade";
import { TipoUnidade, Unidade } from "@/lib/interfaces";
import { deleteUnidade } from "@/services/api_unidade";

export function LinhaUnidade({
    unidade,
    tipos_unidade
}: {
    unidade: Unidade;
    tipos_unidade: TipoUnidade[];
}) {

    const router = useRouter();
    const tipo_unidade = tipos_unidade.findLast((t)=>(t.id == unidade.id_tipo_unidade))

    async function excluirUnidade(id?: number) {
        if (!id) {
            alert("Id inválido");
            return;
        }

        let ok = false
        try {
            await deleteUnidade(id)
            ok = true
        } catch (e) {
            console.error(e)
        }

        if (ok) {
            alert("Unidade excluída com sucesso");
            router.refresh();
        } else {
            alert("Erro ao excluir");
        }
    }

    return (
        <TableRow className="h-16">
            <TableCell className="indent-3">{unidade.nome}</TableCell>
            <TableCell>{tipo_unidade?.tipo}</TableCell>
            <TableCell>{unidade.endereco}</TableCell>
            <TableCell>{unidade.estado}</TableCell>
            <TableCell>{unidade.cidade}</TableCell>
            <TableCell>{unidade.rua}</TableCell>

            <TableCell>
                <div className="flex items-center gap-4">

                    {/* Editar */}
                    <Dialog>
                        <DialogTrigger className="cursor-pointer">
                            <SquarePen/>
                        </DialogTrigger>

                        <FormUnidade
                            tipo="editar"
                            id_editar={unidade.id}
                            default_value={unidade}
                            tipos_unidade={tipos_unidade}
                        />
                    </Dialog>

                    {/* Excluir */}
                    <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => excluirUnidade(unidade.id)}
                    >
                        <Trash2 className="text-red-500"/>
                    </button>
                </div>
            </TableCell>
        </TableRow>
    );
}
