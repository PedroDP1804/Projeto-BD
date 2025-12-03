"use client"

import { TableCell, TableRow } from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { FormEquipe } from "./form_equipe";
import { Equipe, Pesquisador } from "@/lib/interfaces";
import { deleteEquipe } from "@/services/api_equipe";

interface Props {
    equipe:Equipe,
    pesquisadores: Pesquisador[],
}

export function LinhaEquipe({ equipe, pesquisadores }:Props ) {

    const router = useRouter();
    const pesquisador = pesquisadores.findLast((p)=>(p.id === equipe.id_pesquisador))

    // Deletar equipe
    async function excluirEquipe(id?: number) {

        if (!id) {
            alert("Id inválido");
            return;
        }

        let ok = false
        try {
            await deleteEquipe(id)
            ok = true
        } catch (e) {
            console.error(e)
        }

        if (ok) {
            alert(`Equipe "${equipe.nome}" (id=${id}) excluída com sucesso`);
            router.refresh();
        } else {
            alert("Erro ao excluir equipe");
        }
    }

    return (
        <TableRow className="h-16">

            <TableCell className="indent-3">{equipe.nome}</TableCell>
            <TableCell>{pesquisador?.nome ?? "-"}</TableCell>

            <TableCell>
                <div className="flex items-center gap-4">

                    {/* Editar */}
                    <Dialog>
                        <DialogTrigger className="cursor-pointer">
                            <SquarePen/>
                        </DialogTrigger>

                        <FormEquipe
                            tipo="editar"
                            pesquisadores={pesquisadores}
                            id_editar={equipe.id}
                            default_value={equipe}
                        />
                    </Dialog>

                    {/* Excluir */}
                    <button
                        type="button"
                        onClick={() => excluirEquipe(equipe.id)}
                        className="cursor-pointer"
                    >
                        <Trash2 className="text-red-500"/>
                    </button>

                </div>
            </TableCell>

        </TableRow>
    );
}
