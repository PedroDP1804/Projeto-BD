"use client"
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TelefonesInput } from "./telefones_input";
import { Pesquisador } from "@/lib/interfaces";

interface FormPesquisadorProps {
    tipo: "criar"|"editar",
    id_editar?: number,
    default_value?: Partial<Pesquisador>,
}

export function FormPesquisador({tipo, id_editar, default_value}:FormPesquisadorProps) {
    
    // hook para atualizar a página
    const router = useRouter()

    // edita o pesquisador no BD e atualiza a página
    async function handleSubmit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault()

        // extrai os dados do formulário
        const formData = new FormData(event.currentTarget)
        const data:Pesquisador = {
            id: id_editar,
            nome: formData.get("nome") as string,
            email: formData.get("email") as string,
            cpf: formData.get("cpf") as string,
            data_nascimento: new Date(formData.get("data_nascimento") as string + "T00:00:00.000-03:00"),
            telefones: formData.getAll("telefones") as string[],
            status: (formData.get("status") as string) as "Ativo"|"Inativo",
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

        // Retorno
        if (result) {
            alert(`Pesquisador ${tipo === "criar" ? "criado" : "editado"} com sucesso`)
            router.refresh()
        } else
            alert(`Ocorreu um erro ao ${tipo === "criar" ? "criar" : "editar"} pesquisador.`)
    }

    return (
        <DialogContent>

            <DialogHeader>
                <DialogTitle className="text-2xl">
                    {tipo === "criar" ? "Adicionar" : "Editar"} Pesquisador
                </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit}> 
                {/* Campo Nome */}
                <h2 className="text-lg">
                    Nome
                </h2>
                <input
                    type="text"
                    name="nome"
                    defaultValue={default_value?.nome}
                    placeholder="Nome do Pesquisador"
                    className="border-2 indent-2 px-2 py-3 mt-1 w-[90%] rounded-md min-w-[200px]"
                    required={tipo=="criar"}
                />

                {/* Campo Email */}
                <h2 className="text-lg mt-4">
                    Email
                </h2>
                <input
                    type="text"
                    name="email"
                    defaultValue={default_value?.email}
                    placeholder="Email do Pesquisador"
                    className="border-2 indent-2 px-2 py-3 mt-1 w-[90%] rounded-md min-w-[200px]"
                    required={tipo=="criar"}
                />

                <div className="flex w-[90%] justify-between items-center">
                    {/* Campo CPF */}
                    <div>
                        <h2 className="text-lg mt-4">
                            CPF
                        </h2>
                        <input
                            type="text"
                            name="cpf"
                            defaultValue={default_value?.cpf}
                            placeholder="000.000.000-00"
                            className="border-2 indent-2 px-2 py-3 mt-1 w-[40%] rounded-md min-w-[200px]"
                            required={tipo=="criar"}
                        />
                    </div>

                    {/* Campo Data de Nascimento */}
                    <div>
                        <h2 className="text-lg mt-4">
                            Data de Nascimento
                        </h2>
                        <input
                            type="date"
                            name="data_nascimento"
                            defaultValue={default_value?.data_nascimento?.toISOString().slice(0,10)}
                            placeholder="Data de Nascimento do Pesquisador"
                            className="border-2 indent-2 px-2 py-3 mt-1 w-[40%] rounded-md min-w-[200px]"
                            required={tipo=="criar"}
                        />
                    </div>
                </div>

                {/* Campo Telefones */}
                <h2 className="text-lg mt-4">
                    Telefone(s)
                </h2>
                <TelefonesInput defaultValue={default_value?.telefones}/>

                {/* Campo Status */}
                <h2 className="text-lg mt-4">
                    Status
                </h2>
                <select
                    name="status"
                    defaultValue={default_value?.status ?? ""}
                    className="border-2 indent-2 px-2 py-3 mt-1 w-[90%] rounded-md min-w-[200px]"
                    required={tipo=="criar"}
                >
                    <option disabled value="">-- Selecione um Status --</option>
                    <option value="Ativo">
                        Ativo
                    </option>
                    <option value="Inativo">
                        Inativo
                    </option>
                </select>

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
    )
    
}