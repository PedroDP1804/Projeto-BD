"use client"

import { TableCell, TableRow } from "@/components/ui/table"
import { SquarePen, Trash2 } from "lucide-react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { FormBairro } from "./form_bairro"
import { Bairro, Frequencia } from "@/lib/interfaces"
import { deleteBairro } from "@/services/api_bairro"

export function LinhaBairro({ bairro, frequencias }: {
    bairro: Bairro,
    frequencias: Frequencia[]
}) {

    const router = useRouter()
    const frequencia = frequencias.findLast((f)=>(f.id == bairro.id_frequencia))

    async function excluirBairro(id?: number) {
        if (!id) {
            alert("ID inválido")
            return
        }

        let ok = false
        try {
            await deleteBairro(id)
            ok = true
        } catch (e) {
            console.error(e)
        }

        if (ok) {
            alert(`Bairro ${bairro.nome} excluído`)
            router.refresh()
        }
    }

    return (
        <TableRow className="h-16">
            <TableCell className="indent-3">{bairro.nome}</TableCell>
            <TableCell>{frequencia?.periodo ?? '-'}</TableCell>

            <TableCell>
                <div className="flex items-center justify-end gap-4 pr-9">

                    <Dialog>
                        <DialogTrigger className="cursor-pointer">
                            <SquarePen />
                        </DialogTrigger>

                        <FormBairro
                            tipo="editar"
                            id_editar={bairro.id}
                            default_value={bairro}
                            frequencias={frequencias}
                        />
                    </Dialog>

                    <button
                        type="button"
                        onClick={() => excluirBairro(bairro.id)}
                        className="cursor-pointer"
                    >
                        <Trash2 className="text-red-500" />
                    </button>

                </div>
            </TableCell>
        </TableRow>
    )
}
