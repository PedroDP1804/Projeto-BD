"use client"

import { useState } from "react"
import { PlusCircle, MinusCircle } from "lucide-react"

interface TelefonesInputProps {
    defaultValue?: string[]
}

export function TelefonesInput({ defaultValue = [] }: TelefonesInputProps) {

    const [telefones, setTelefones] = useState<string[]>(defaultValue)

    // adiciona um telefone novo (vazio)
    function addTelefone() {
        setTelefones([...telefones, ""])
    }

    // remove telefone pelo index
    function removeTelefone(index: number) {
        const novaLista = telefones.filter((_, i) => i !== index)
        setTelefones(novaLista)
    }

    // edita texto do telefone
    function updateTelefone(index: number, novo: string) {
        const novaLista = [...telefones]
        novaLista[index] = novo
        setTelefones(novaLista)
    }

    return (
        <div className="flex flex-col gap-3 w-[90%]">

            {/* Lista */}
            {telefones.length === 0 && (
                <p className="text-sm text-gray-500 ml-2">
                    Nenhum telefone adicionado.
                </p>
            )}

            {telefones.map((tel, index) => (
                <div
                    key={index}
                    className="flex items-center gap-3"
                >
                    <input
                        type="text"
                        name="telefones"
                        value={tel}
                        onChange={(e) => updateTelefone(index, e.target.value)}
                        placeholder="(00) 00000-0000"
                        className="border-2 px-3 py-2 rounded-md w-full"
                        required
                    />

                    <button
                        type="button"
                        onClick={() => removeTelefone(index)}
                        className="text-red-500 cursor-pointer"
                    >
                        <MinusCircle size={22} />
                    </button>
                </div>
            ))}

            {/* Botão adicionar */}
            <button
                type="button"
                onClick={addTelefone}
                className="flex items-center gap-2 text-blue-600 font-medium mb-2"
            >
                <PlusCircle size={20} />
                Adicionar telefone
            </button>
        </div>
    )
}
