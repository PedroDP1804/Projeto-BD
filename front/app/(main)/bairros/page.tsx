import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { FormBairro } from "./_components/form_bairro"
import { LinhaBairro } from "./_components/linha_bairro"
import { bairros_exemplo, frequencias_exemplo } from "@/lib/exemplos"

export interface Frequencia {
    id_frequencia: number
    periodo: string
}

export interface Bairro {
    id_bairro?: number
    nome: string
    id_frequencia: number
    frequencia?: Frequencia
}

export default async function PageBairros() {

    async function getFrequencias(): Promise<Frequencia[]> {

        // ##----------------------------------------------------##
        //  Inserir aqui a chamada de API

        const result:Frequencia[] = frequencias_exemplo //<---- aqui
        // ##----------------------------------------------------##
        
        return result
    }
    
    async function getBairros(): Promise<Bairro[]> {
        // ##----------------------------------------------------##
        //  Inserir aqui a chamada de API
    
        const result:Bairro[] = bairros_exemplo //<---- aqui
        // ##----------------------------------------------------##
        
        return result
    }

    const frequencias = await getFrequencias()
    const bairros = await getBairros()

    return (
        <div className="px-5 pt-6">

            <h1 className="text-3xl font-semibold">Bairros</h1>
            <p className="text-gray-500 text-lg">Gerencie os bairros cadastrados</p>

            {/* Busca e novo */}
            <section className="flex justify-between mt-8">
                <div className="flex items-center w-[35%] border border-gray-300 rounded-xl pl-3">
                    <Search className="text-gray-400"/>
                    <input
                        className="w-full h-full placeholder-gray-400 indent-3"
                        placeholder="Buscar bairro (não implementado)"
                    />
                </div>

                <Dialog>
                    <DialogTrigger className="cursor-pointer text-white bg-azul-sidebar rounded-md py-2 px-5">
                        + Novo Bairro
                    </DialogTrigger>

                    <FormBairro tipo="criar" frequencias={frequencias} />
                </Dialog>
            </section>

            {/* Tabela */}
            <section className="mt-6 max-h-[400px] overflow-y-scroll">
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-100">
                            <TableRow>
                                <TableHead className="indent-3">Nome</TableHead>
                                <TableHead>Frequência</TableHead>
                                <TableHead className="flex justify-end pr-15">Ações</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {bairros.map((b) => (
                                <LinhaBairro
                                    key={b.id_bairro}
                                    bairro={b}
                                    frequencias={frequencias}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

        </div>
    )
}
