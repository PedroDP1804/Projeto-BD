"use client"

import { useRouter } from "next/navigation"
import { FormEvent } from "react"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Bairro, Frequencia } from "@/lib/interfaces"

interface FormBairroProps {
    tipo: "criar" | "editar"
    id_editar?: number
    default_value?: Partial<Bairro>
    frequencias: Frequencia[]
}

export function FormBairro({ tipo, id_editar, default_value, frequencias }: FormBairroProps) {

    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const data: Bairro = {
            id_bairro: id_editar,
            nome: formData.get("nome") as string,
            id_frequencia: Number(formData.get("id_frequencia")),
        }

        let result = false

        if (tipo === "criar") {
            // ##----------------------------------------------------##
            //  Inserir aqui a chamada de API pra CRIAR
                // await funcaoAPI(data)
                result = true
                alert(JSON.stringify(data))
                // alert(data.data_nascimento.toLocaleDateString("pt-br"))
            // ##----------------------------------------------------##
        }

        if (tipo === "editar") {
            // ##----------------------------------------------------##
            //  Inserir aqui a chamada de API pra EDITAR
                // await funcaoAPI(data)
                result = true
                alert(JSON.stringify(data))
                // alert(data.data_nascimento.toLocaleDateString("pt-br"))
            // ##----------------------------------------------------##
        }

        if (result) {
            alert(`Bairro ${tipo === "criar" ? "criado" : "editado"} com sucesso`)
            router.refresh()
        } else {
            alert("Erro ao salvar bairro")
        }
    }

    return (
        <DialogContent>

            <DialogHeader>
                <DialogTitle className="text-2xl">
                    {tipo === "criar" ? "Adicionar" : "Editar"} Bairro
                </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit}>

                <h2 className="text-lg">Nome</h2>
                <input
                    type="text"
                    name="nome"
                    defaultValue={default_value?.nome}
                    placeholder="Nome do bairro"
                    className="border-2 indent-2 px-2 py-3 mt-1 w-[90%] rounded-md"
                    required
                />

                <h2 className="text-lg mt-4">Frequência</h2>
                <select
                    name="id_frequencia"
                    defaultValue={default_value?.id_frequencia ?? ""}
                    className="border-2 px-2 py-3 mt-1 w-[90%] rounded-md"
                    required
                >
                    <option disabled value="">-- Selecione uma Frequência --</option>
                    {frequencias.map((freq) => (
                        <option key={freq.id_frequencia} value={freq.id_frequencia}>
                            {freq.periodo}
                        </option>
                    ))}
                </select>

                <div className="w-full flex justify-center mt-8">
                    <button
                        type="submit"
                        className="text-white font-bold w-40 cursor-pointer bg-azul-sidebar rounded-md py-2 px-5"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </DialogContent>
    )
}
