import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { FormBairro } from "./_components/form_bairro"
import { LinhaBairro } from "./_components/linha_bairro"
import { Header } from "@/app/_components/header"
import { getBairros } from "@/services/api_bairro"
import { getFrequencias } from "@/services/apis"

export default async function PageBairros() {
    
    const frequencias = await getFrequencias()
    const bairros = await getBairros()

    return (
        <div className="px-5 pt-6">

            {/* Header */}
            <Header
                titulo="Bairros"
                subtitulo="Gerencie os bairros cadastrados"
            />

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
                                <TableHead>Frequência da Coleta</TableHead>
                                <TableHead className="flex justify-end pr-15">Ações</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {bairros.map((b) => (
                                <LinhaBairro
                                    key={b.id}
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
