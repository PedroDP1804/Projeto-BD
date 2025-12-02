"use client"

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormColeta } from "./form_coleta";
import { Bairro, Coleta, Unidade } from "@/lib/interfaces";

interface Props {
    coleta: Coleta;
    bairros: Bairro[];
    unidades: Unidade[];
}

export function LinhaColeta({ coleta, bairros, unidades }: Props) {

    const router = useRouter();

    // Deletar coleta
    async function deleteColeta(id?: number) {

        if (!id) {
            alert("Id inválido");
            return;
        }

        // ##----------------------------------------------------##
        //  Inserir aqui a chamada de API
        const result = true //resultado da chamada
        // ##----------------------------------------------------##

        if (result) {
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
            <TableCell>{coleta.bairro.nome}</TableCell>
            <TableCell>{coleta.unidade_tratamento.nome}</TableCell>

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
                            id_editar={coleta.id_coleta}
                            default_value={coleta}
                        />
                    </Dialog>

                    {/* Excluir */}
                    <button
                        type="button"
                        onClick={() => deleteColeta(coleta.id_coleta)}
                        className="cursor-pointer"
                    >
                        <Trash2 className="text-red-500" />
                    </button>

                </div>
            </TableCell>

        </TableRow>
    );
}