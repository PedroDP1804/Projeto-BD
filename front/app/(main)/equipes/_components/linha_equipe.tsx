"use client"

import { TableCell, TableRow } from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { FormEquipe } from "./form_equipe";
import { Equipe, Pesquisador } from "@/lib/interfaces";

interface Props {
    equipe:Equipe,
    pesquisadores: Pesquisador[],
}

export function LinhaEquipe({ equipe, pesquisadores }:Props ) {

    const router = useRouter();

    // Deletar equipe
    async function deleteEquipe(id?: number) {

        if (!id) {
            alert("Id inválido");
            return;
        }

        // ##----------------------------------------------------##
        //  Inserir aqui a chamada de API
        const result = true //resultado da chamada
        
        // ##----------------------------------------------------##

        if (result) {
            alert(`Equipe "${equipe.nome}" (id=${id}) excluída com sucesso`);
            router.refresh();
        } else {
            alert("Erro ao excluir equipe");
        }
    }

    return (
        <TableRow className="h-16">

            <TableCell className="indent-3">{equipe.nome}</TableCell>
            <TableCell>{equipe.pesquisador.nome}</TableCell>

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
                            id_editar={equipe.id_equipe}
                            default_value={equipe}
                        />
                    </Dialog>

                    {/* Excluir */}
                    <button
                        type="button"
                        onClick={() => deleteEquipe(equipe.id_equipe)}
                        className="cursor-pointer"
                    >
                        <Trash2 className="text-red-500"/>
                    </button>

                </div>
            </TableCell>

        </TableRow>
    );
}
