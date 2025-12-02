"use client"
import { TableCell, TableRow } from "@/components/ui/table";
import { Phone, SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger, } from "@/components/ui/dialog";
import { FormPesquisador } from "./form_pesquisador";
import { Pesquisador } from "@/lib/interfaces";
import { deletePesquisador } from "@/services/api";

export function LinhaPesquisador({pesquisador}:{pesquisador:Pesquisador}) {

    // hook para atualizar a página
    const router = useRouter()

    // exclui o pesquisador do BD e atualiza a página
    async function excluirPesquisador(id?:number) {

        if (!id) {
            alert("Id inválido")
            return
        }
        
        let ok = true
        try {
            await deletePesquisador(id)
        } catch (e) {
            ok = false
            console.error(e)
        }

        if (ok){
            alert(`Pesquisador ${pesquisador.nome} (id=${id}) excluído com sucesso`)
            router.refresh()
        }
        else
            alert("Erro ao excluir pesquisador")
    }

    return (
        <>

            <TableRow
                className="h-16"
            >
                <TableCell className="indent-3">{pesquisador.nome}</TableCell>
                <TableCell>{pesquisador.email}</TableCell>
                <TableCell>{pesquisador.cpf}</TableCell>
                <TableCell>{pesquisador.data_nascimento.toLocaleDateString("pt-br")}</TableCell>
                <TableCell>
                    {pesquisador.telefones.map((telefone, index)=>(
                        <h3 key={index} className="bg-gray-200 rounded-lg px-3 py-0.5 text-center w-max mb-1 flex gap-2 items-center">
                            <Phone size={15}/> {telefone}
                        </h3>
                    ))}

                </TableCell>
                <TableCell>{pesquisador.status}</TableCell>
                
                {/* Botões */}
                <TableCell>
                    <div className="flex items-center gap-4">

                        {/* Editar */}
                        <Dialog>

                            {/* Botão Editar */}
                            <DialogTrigger className="cursor-pointer">
                                <SquarePen/>
                            </DialogTrigger>

                            
                            <FormPesquisador
                                tipo="editar"
                                id_editar={pesquisador.id}
                                default_value={pesquisador}
                            />

                        </Dialog>
                        
                        {/* Excluir */}
                        <button
                            type="button"
                            onClick={()=>{excluirPesquisador(pesquisador.id)}}
                            className="cursor-pointer"
                        >
                            <Trash2 className="text-red-500"/>
                        </button>

                    </div>
                </TableCell>
            </TableRow>
        </>
    )
}